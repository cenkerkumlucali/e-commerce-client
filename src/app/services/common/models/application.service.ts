import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {firstValueFrom, Observable} from "rxjs";
import {Menu} from "../../../contracts/application-configuration/menu";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) {
  }

  async getAuthorizeDefinitionEndpoints(): Promise<Menu[]> {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "ApplicationServices"
    })
    return await firstValueFrom(observable);
  }
}
