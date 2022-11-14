import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {SpinnerType} from "../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClientService} from "../../services/common/http-client.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent, DeleteState} from "../../dialogs/delete-dialog/delete-dialog.component";
import {AlertifyService, MessageType, Position} from "../../services/admin/alertify.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/common/dialog.service";

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
              private _renderer: Renderer2,
              private httpClientService: HttpClientService,
              private spinner: NgxSpinnerService,
              public dialog: MatDialog,
              private alertifyService: AlertifyService,
              private dialogService: DialogService) {
    const image = _renderer.createElement("img");
    image.setAttribute("src", "assets/delete.png");
    image.setAttribute("style", "cursor:pointer;");
    image.width = 25;
    image.height = 25;
    _renderer.appendChild(element.nativeElement, image)
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        await this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message(`${this.controller == 'roles' ? 'Rol' : 'Ürün'} başarıyla silinmiştir.`, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertifyService.message(`${this.controller == 'roles' ? 'Rol' : 'Ürün'} silinirken beklenmedik bir hata oluştu.`, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        });
      }
    })

  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: DeleteState.Yes,
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }

}
