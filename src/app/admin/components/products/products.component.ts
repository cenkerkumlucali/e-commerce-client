import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClientService} from "../../../services/common/http-client.service";
import {CreateProduct} from "../../../contracts/create-product";
import {ListComponent} from "./list/list.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private httpService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: CreateProduct) {
    this.listComponents.getProducts();
  }
}
