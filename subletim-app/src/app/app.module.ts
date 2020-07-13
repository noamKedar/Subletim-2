import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SubletsComponent} from "./components/subletComponent/sublet.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AddSubletComponent} from "./components/addSubletComponent/addSublet.component";
import {ApartmentComponents} from "./components/apartmentComponent/apartment.components";
import {UserComponent} from "./components/user.components";
import {AdminComponent} from "./components/admin/admin.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {RouterModule} from "@angular/router";
import {addApartmentComponent} from "./components/addApartmentComponent/addApartment.component";
import {MainPageComponent} from "./components/mainPageComponent/mainPage.component";
import {GraphsComponent} from "./components/graphsComponent/graphs.component";

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
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, SubletsComponent]
})
export class AppModule { }
