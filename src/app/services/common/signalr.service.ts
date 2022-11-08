import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  start(hubUrl: string) {
    hubUrl = environment.domainUrl + hubUrl;
    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
    hubConnection.start()
      .then(() => console.log("Connected!"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000));

    hubConnection.onreconnected(connectionId => {
      console.log("Reconnected");
    });
    hubConnection.onreconnecting(error => {
      console.log("Reconnecting")
    });
    hubConnection.onclose(error => {
      console.log("Close reconnection")
    });
    return hubConnection;
  }

  invoke(hubUrl:string,procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (value) => void) {
    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack)
  }

  on(hubUrl:string,procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack)
  }
}
