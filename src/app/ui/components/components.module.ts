import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasketsModule} from "./baskets/baskets.module";
import {HomeModule} from "./home/home.module";
import {ProductsModule} from "./products/products.module";
import {RegisterModule} from "./register/register.module";
import {PasswordResetModule} from "./password-reset/password-reset.module";
import {UpdatePasswordModule} from "./update-password/update-password.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    ProductsModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
    // LoginModule
  ],
  exports: [
    BasketsModule
  ],
})
export class ComponentsModule {
}
