import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {SignalRService} from "../../../services/common/signalr.service";
import {ReceiveFunctions} from "../../../constants/receive-functions";
import {HubUrls} from "../../../constants/hub-urls";
import {AlertifyService, MessageType, Position} from "../../../services/admin/alertify.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
              private signalRService: SignalRService,
              private alertifyService:AlertifyService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit():
    void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertifyService.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopRight
      });
    });
  }

}
