import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from "./admin/admin.module";
import {UiModule} from "./ui/ui.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {LoginComponent} from "./ui/components/login/login.component";
import {HttpErrorHandlerInterceptorService} from "./services/common/http-error-handler-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, UiModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7129"],

      }
    })
  ],
  providers: [
    {provide: "baseUrl", useValue: "https://localhost:7129/api", multi: true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("498371225778-dugua9lr5e4p2dia6mkfatus24bf7db2.apps.googleusercontent.com")
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('641414837574832')
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
