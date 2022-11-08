import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../services/common/models/order.service";
import {SingleOrder} from "../../contracts/order/single-order";

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
              private orderService: OrderService) {
    super(dialogRef)
  }

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();


  singleOrder: SingleOrder;
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getById(this.data as string);
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) =>
      basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

}

export enum OrderDetailDialogState {
  Close, OrderComplete
}
