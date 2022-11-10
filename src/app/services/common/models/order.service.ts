import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {CreateOrder} from "../../../contracts/order/create-order";
import {firstValueFrom, observable, Observable} from "rxjs";
import {ListOrder} from "../../../contracts/order/list-order";
import {HttpErrorResponse} from "@angular/common/http";
import {ListProduct} from "../../../contracts/product/list_product";
import {SingleOrder} from "../../../contracts/order/single-order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) {
  }

  async create(order: CreateOrder): Promise<void> {
    const observable = this.httpClientService.post({
      controller: "orders"
    }, order)
    await firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage) => void): Promise<{ totalOrderCount: number; orders: ListOrder[] }> {
    const observable: Observable<{ totalOrderCount: number; orders: ListOrder[] }> = this.httpClientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack).catch(error => errorCallBack);
    return await promiseData;
  }

  async getById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage) => void): Promise<SingleOrder> {
    const observable: Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller: "orders",
    }, id)
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack).catch(error => errorCallBack(error));
    return await promiseData;
  }

  async completeOrder(id: string, callBackFuntion: () => void) {
    const observable: Observable<any> = this.httpClientService.get<any>({
      controller: "orders",
      action: "complete-order",
    }, id)
    await firstValueFrom(observable);
    callBackFuntion();
  }
}
