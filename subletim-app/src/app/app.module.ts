import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { AppComponent } from './app.component';
import {SubletsComponent} from "./components/subletComponent/sublet.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AddSubletComponent} from "./components/addSubletComponent/addSublet.component";
import {ApartmentComponents} from "./components/apartmentComponent/apartment.components";
import {UserComponent} from "./components/user/user.components";
import {AdminComponent} from "./components/admin/admin.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {addApartmentComponent} from "./components/addApartmentComponent/addApartment.component";
import {MainPageComponent} from "./components/mainPageComponent/mainPage.component";
import {GraphsDirective} from "./components/graphsDirective/graphs.directive";
import {UpdateUserComponent} from "./components/updateUserComponent/updateUser.component";
import {ViewSubletComponent} from "./components/viewSubletComponent/viewSublet.component";
import { StatisticsComponent } from './statistics/statistics.component';
import {customPipe} from "./statistics/MyCustomPipe";
import {GoogleMapsModule} from "@angular/google-maps";

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SubletsComponent,
    AddSubletComponent,
    SubletsComponent,
    ApartmentComponents,
    UserComponent,
    addApartmentComponent,
    MainPageComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    GraphsDirective,
    UpdateUserComponent,
    ViewSubletComponent,
    StatisticsComponent,
    customPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
