import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ListProduct} from "../../../../contracts/list_product";
import {ProductService} from "../../../../services/common/models/product.service";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";
import {MatPaginator} from "@angular/material/paginator";
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
              private productService: ProductService,
              private alertify: AlertifyService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'edit', 'delete'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    await this.getProducts();
  }

  async getProducts() {
    const allProducts: { totalCount: number; products: ListProduct[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  async pageChanged() {
    await this.getProducts();
  }

  /* delete(id:string,event){
  const img:HTMLImageElement = event.srcElement;
  $(img.parentElement.parentElement).fadeOut(2000);
  }*/
}
