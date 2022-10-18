import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FileUploadDialogComponent} from "./file-upload-dialog/file-upload-dialog.component";


@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class DialogModule {
}
