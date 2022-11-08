import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderComponent} from './order.component';
import {RouterModule} from "@angular/router";
import {ListComponent} from './list/list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DeleteDirectiveModule} from "../../../directives/admin/delete.directive.module";


@NgModule({
  declarations: [
    OrderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      {path: "", component: OrderComponent}
    ])
  ]
})
export class OrderModule {
}
