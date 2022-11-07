import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/common/models/user.service";
import {CreateUser} from "../../../contracts/user/create_user";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../services/ui/custom-toastr.service";
import {BaseComponent} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,
              private userService:UserService,
              private toastrService:CustomToastrService,
              spinner:NgxSpinnerService) {
    super(spinner);
  }

  form: UntypedFormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["", [
        Validators.required
      ]],
      confirmPassword: ["", [
        Validators.required
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let confirmPassword = group.get('confirmPassword').value
        return password === confirmPassword ? null : { notSame: true }
      }
    })
  }

  get component() {
    return this.form.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.form.invalid)
      return;

    const result: CreateUser = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }
}
