import {Injectable, ProviderToken} from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {TokenResponse} from "../../../contracts/token/tokenResponse";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../ui/custom-toastr.service";
import {SocialUser} from "@abacritt/angularx-social-login";
import {HttpClientService} from "../http-client.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) {
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, {userNameOrEmail, password})
    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "refreshtoken"
    }, {refreshToken: refreshToken})
    try {
      const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
      if (token) {
        localStorage.setItem("accessToken", token.token.accessToken);
        localStorage.setItem("refreshToken", token.token.refreshToken);
      }
      callBackFunction(token ? true : false);
    } catch {
      callBackFunction(false);
    }

  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login"
    }, user)
    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "facebook-login"
    }, user);
    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callBackFunction();
  }

  async passwordReset(email: string, callBackFunction?: () => void) {
    const observable = this.httpClientService.post({
      controller: "auth",
      action: "PasswordReset"
    }, {email: email});
    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    }, {resetToken: resetToken, userId: userId});
    const state: boolean = await firstValueFrom(observable);
    callBackFunction();
    return state;
  }

}
