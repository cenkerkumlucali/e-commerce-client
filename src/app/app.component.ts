import {Component, ViewChild} from '@angular/core';
import {AuthService} from "./services/common/auth.service";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "./services/ui/custom-toastr.service";
import {Router} from "@angular/router";
import {HttpClientService} from "./services/common/http-client.service";
import {ComponentType, DynamicLoadComponentService} from "./services/common/dynamic-load-component.service";
import {DynamicLoadComponentDirective} from "./directives/common/dynamic-load-component.directive";

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(DynamicLoadComponentDirective, {static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective

  constructor(public authService: AuthService,
              private toastrService: CustomToastrService,
              private router: Router,
              private httpClientService: HttpClientService,
              private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
    httpClientService.get({
      controller: "baskets"
    }).subscribe(data => {
      console.log(data)
    })
  }


  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate([''])
    this.toastrService.message("Oturum Kapatılmıştır.", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }
}

