import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SubletsComponent} from "./components/sublet.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AddSubletComponent} from "./components/addSubletComponent/addSublet.component";
import {ApartmentComponents} from "./components/apartment.components";
import {UserComponent} from "./components/user.components";
import {addApartmentComponent} from "./components/addApartmentComponent/addApartment.component";

@NgModule({
  declarations: [
    AppComponent,
    SubletsComponent,
    AddSubletComponent,
    SubletsComponent,
    ApartmentComponents,
    UserComponent,
    addApartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent, SubletsComponent, AddSubletComponent]
})
export class AppModule { }
