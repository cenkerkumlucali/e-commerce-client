import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {CreateProduct} from "../../../../contracts/product/create-product";
import {AlertifyService, MessageType, Position} from "../../../../services/admin/alertify.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ProductService} from "../../../../services/common/models/product.service";
import {RoleService} from "../../../../services/common/models/role.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private roleService: RoleService,
              private alertify: AlertifyService) {
    super(spinner);
  }

  @Output() createdRole: EventEmitter<any> = new EventEmitter<CreateProduct>();

  ngOnInit(): void {
  }

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Rol başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      })
      this.createdRole.emit(name);
    });
  }
}
