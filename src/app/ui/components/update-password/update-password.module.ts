import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdatePasswordComponent} from "./update-password.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: ":userId/:resetToken", component: UpdatePasswordComponent}
    ])
  ]
})
export class UpdatePasswordModule { }
