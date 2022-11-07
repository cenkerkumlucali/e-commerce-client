import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/common/models/product.service";
import {ListProduct} from "../../../../contracts/product/list_product";
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../../../../services/common/models/file.service";
import {BaseUrl} from "../../../../constants/base-url";
import {BasketService} from "../../../../services/common/models/basket.service";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../../services/ui/custom-toastr.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService,
              private basketService:BasketService,
              private activatedRoute: ActivatedRoute,
              private fileService:FileService,
              private toastrService:CustomToastrService,
              spinner:NgxSpinnerService) {
    super(spinner);
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 6;
  pageList: number[] = [];
  defaultImagePath = "assets/default-product.png";
  products: ListProduct[];
  baseUrl:BaseUrl;

  async ngOnInit(){
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalProductCount: number, products: ListProduct[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;

      this.products = this.products.map<ListProduct>(p => {
        const listProduct: ListProduct = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase)?.path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles
        };

        return listProduct;
      });
      console.log(this.products)
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];
      if (this.totalPageCount >= 7) {
        if (this.currentPageNo - 3 <= 0)
          for (let i = 1; i <= 7; i++)
            this.pageList.push(i);
        else if (this.currentPageNo + 3 >= this.totalPageCount)
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
            this.pageList.push(i);
        else
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
            this.pageList.push(i);
      } else {
        for (let i = 1; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      }

    });
  }

  async addToBasket(product: ListProduct) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.add({
      productId: product.id,
      quantity: 1
    });
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastrService.message("Ürün sepete eklenmiştir.","Sepete Eklendi",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
  }
}
