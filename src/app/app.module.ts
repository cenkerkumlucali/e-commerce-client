import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from "./admin/admin.module";
import {UiModule} from "./ui/ui.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpClientModule} from "@angular/common/http";import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule, UiModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        HttpClientModule,
        ToastrModule.forRoot()
    ],
    providers: [
        {provide: "baseUrl", useValue: "https://localhost:7129/api", multi: true}
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
