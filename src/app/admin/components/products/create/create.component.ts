import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../../services/common/models/product.service";
import {CreateProduct} from "../../../../contracts/create-product";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private productService: ProductService,
              private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter<CreateProduct>();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);


    this.productService.create(create_product, () =>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      })
      this.createdProduct.emit(create_product);
    },errorMessage => {
      errorMessage.forEach((value,index)=>{
        this.alertify.message(value,{
          dismissOthers:false,
          position:Position.TopRight,
          messageType:MessageType.Error
        })
      })

    });
  }
}
