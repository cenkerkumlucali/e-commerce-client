import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {firstValueFrom, Observable} from "rxjs";
import {BaseUrl} from "../../../constants/base-url";


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) {
  }

   // @ts-ignore
  async getBaseStorageUrl(): Promise<BaseUrl> {
     const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
       controller: "files",
       action: "getBaseStorageUrl"
     });
    return  await firstValueFrom(getObservable);
   }
}
