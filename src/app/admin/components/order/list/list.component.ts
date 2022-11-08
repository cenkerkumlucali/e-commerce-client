import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";
import {DialogService} from "../../../../services/common/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {ListOrder} from "../../../../contracts/order/list-order";
import {OrderService} from "../../../../services/common/models/order.service";
import {
  OrderDetailDialogComponent,
  OrderDetailDialogState
} from "../../../../dialogs/order-detail-dialog/order-detail-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private alertify: AlertifyService,
              public dialogService: DialogService,
              private orderService: OrderService) {
    super(spinner);
  }

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'viewdetail', 'delete'];
  dataSource: MatTableDataSource<ListOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    await this.getOrders();
  }

  async getOrders() {
    const allOrders: { totalOrderCount: number; orders: ListOrder[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      data:id,
      options:{
        width:"750px"
      }
    })
  }
}
