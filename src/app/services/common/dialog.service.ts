import { Injectable } from '@angular/core';
import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }


  openDialog(dialogParameters:Partial<DialogParameter>): void {
    // @ts-ignore
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width:dialogParameters.options?.width,
      height:dialogParameters.options?.height,
      position:dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data) {
        dialogParameters.afterClosed();
      }
    });
  }

}
export class DialogParameter{
  componentType:ComponentType<any>;
  data:any;
  afterClosed:()=>void;
  options?:Partial<DialogOptions> = new DialogOptions();
}
export class DialogOptions{
  width?:string = "250px";
  height?:string;
  position?:DialogPosition;
}
