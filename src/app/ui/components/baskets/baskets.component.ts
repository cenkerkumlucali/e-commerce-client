import {Component, OnInit} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {BasketService} from "../../../services/common/models/basket.service";
// @ts-ignore
import {ListBasketItem} from "../../../contracts/basket/list-basket-item";
import {OrderService} from "../../../services/common/models/order.service";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../services/ui/custom-toastr.service";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/common/dialog.service";
import {
  BasketItemDeleteState,
  BasketItemRemoveDialogComponent
} from "../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component";
import {
  ShoppingCompleteComponent,
  ShoppingCompleteState
} from "../../../dialogs/shopping-complete/shopping-complete.component";

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private basketService: BasketService,
              private orderService: OrderService,
              private toatrService: CustomToastrService,
              private router: Router,
              private dialogService: DialogService) {
    super(spinner);
  }

  basketItems: ListBasketItem[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    await this.basketService.updateQuantity({
      basketItemId: basketItemId,
      quantity: quantity
    });
    this.hideSpinner(SpinnerType.BallAtom);
  }

  removeBasketItem(basketItemId: string) {
    $("#basketModel").modal("hide");
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId)
        $("." + basketItemId).fadeOut(500, () => {
          this.hideSpinner(SpinnerType.BallAtom);
        });
        $("#basketModel").modal("show");
      }
    });
  }

  shoppingComplete() {
    $("#basketModel").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingCompleteComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.orderService.create({
          address: "Yenimahalle",
          description: "Falanca filanca"
        });
        this.hideSpinner(SpinnerType.BallAtom);
        this.toatrService.message("Sipariş alınmıştır!", "Sipariş Oluşturuldu!", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
        await this.router.navigate(["/"]);
      }
    });
  }
}
