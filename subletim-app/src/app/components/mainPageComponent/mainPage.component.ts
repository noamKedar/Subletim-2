import {Component} from "@angular/core";
import {SubletService} from "../../services/sublet.service";

@Component({
  selector: 'main-page',
  templateUrl: './mainPage.component.html',
  providers: [],
  styleUrls: ['./mainPage.component.css']
})

export class MainPageComponent {
  addSublet: boolean = false;
  searchSublet: boolean = false;
  addApartment: boolean = false;

  toggleAddSublet() {
    this.addSublet = !this.addSublet;
  }

  toggleSearchSublet() {
    this.searchSublet = !this.searchSublet;
  }

  toggleAddApartment() {
    this.addApartment = !this.addApartment;
  }
}



