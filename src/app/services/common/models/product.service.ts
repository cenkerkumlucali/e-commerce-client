import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {CreateProduct} from "../../../contracts/create-product";
import {HttpErrorResponse} from "@angular/common/http";
import {ListProduct} from "../../../contracts/list_product";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) {
  }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: (errorMessage: string[]) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      _error.forEach((value, index) => {
        errorCallBack(value.value);
      })
    })
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage) => void): Promise<{ totalCount: number; products: ListProduct[] }> {
    const promiseData: Promise<{ totalCount: number; products: ListProduct[] }> = this.httpClientService.get<{ totalCount: number; products: ListProduct[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`,
    }).toPromise();
    promiseData.then(c => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async delete(id: string) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "products"
    }, id);
    await firstValueFrom(observable);
  }
}
