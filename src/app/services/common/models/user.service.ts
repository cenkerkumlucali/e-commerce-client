import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {User} from "../../../entities/user";
import {CreateUser} from "../../../contracts/user/create_user";
import {firstValueFrom, Observable} from "rxjs";
import {CustomToastrService} from "../../ui/custom-toastr.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) {
  }

  // @ts-ignore
  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (errorMessage) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    return await promiseData;
  }

}
