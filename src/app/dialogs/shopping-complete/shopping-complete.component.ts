import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseDialog} from "../base/base-dialog";

declare var $: any;

@Component({
  selector: 'app-shopping-complete',
  templateUrl: './shopping-complete.component.html',
  styleUrls: ['./shopping-complete.component.scss']
})
export class ShoppingCompleteComponent extends BaseDialog<ShoppingCompleteComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<ShoppingCompleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState) {
    super(dialogRef)
  }

  show:boolean;
  compolete() {
    this.show = true;
  }
  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModel").modal("show");
  }

}

export enum ShoppingCompleteState {
  Yes,
  No

}
