import {Component, Input} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {HttpClientService} from "../http-client.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AlertifyService, MessageType, Position} from "../../admin/alertify.service";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../ui/custom-toastr.service";
import {MatDialog} from "@angular/material/dialog";
import {FileUploadDialogComponent} from "../../../dialogs/file-upload-dialog/file-upload-dialog.component";
import {DialogService} from "../dialog.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerType} from "../../../base/base.component";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
              private alertifyService: AlertifyService,
              private customToastrService: CustomToastrService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private spinner: NgxSpinnerService) {
  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallAtom);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({"responseType": "blob"})
        }, fileData).subscribe(data => {
          const message: string = "Dosyalar başarıyla yüklenmiştir.";
          this.spinner.hide(SpinnerType.BallAtom);

          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: false,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          } else {
            this.customToastrService.message(message, 'Başarılı', {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }

        }, (errorResponse: HttpErrorResponse) => {
          const message: string = "Dosyalar yüklenirken beklenmedik bir hata ile karşılaşılmıştır."
          this.spinner.hide(SpinnerType.BallAtom);

          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: false,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          } else {
            this.customToastrService.message(message, 'Başarısız', {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
        })
      }
    },)
  }
}

export enum FileUploadDialogState {
  Yes, No
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
