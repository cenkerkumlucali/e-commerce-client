import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/common/models/user.service";
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../services/common/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FacebookLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {UserAuthService} from "../../../services/common/models/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
              private authService: AuthService,
              spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private socialAuthService: SocialAuthService) {
    super(spinner);
    this.showSpinner(SpinnerType.BallAtom);

    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      switch (user.provider) {
        case "GOOGLE":
          await this.userAuthService.googleLogin(user, () => {});
          break;
        case "FACEBOOK":
          await this.userAuthService.facebookLogin(user, () => {});
          break;
      }
      this.authService.identityCheck();
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }

  ngOnInit(): void {
  }

  login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom)
    this.userAuthService.login(userNameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl)
          this.router.navigate([returnUrl])
      })
      this.hideSpinner(SpinnerType.BallAtom)
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
