import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SubletsComponent} from "./components/sublet.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {ApartmentComponents} from "./components/apartment.components";
import {UserComponent} from "./components/user.components";

@NgModule({
  declarations: [
    AppComponent,
    SubletsComponent,
    ApartmentComponents,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent, SubletsComponent]
})
export class AppModule { }
