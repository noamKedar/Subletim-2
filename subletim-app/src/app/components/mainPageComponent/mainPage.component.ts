import {Component, EventEmitter, Output} from "@angular/core";
import {SubletService} from "../../services/sublet.service";
import {User} from "../user";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

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
  logoutUser: boolean = false;
  currentUser: User;
  @Output() showLoginChange = new EventEmitter<boolean>();

  constructor(
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  toggleAddSublet() {
    this.addSublet = !this.addSublet;
  }

  toggleSearchSublet() {
    this.searchSublet = !this.searchSublet;
  }

  toggleAddApartment() {
    this.addApartment = !this.addApartment;
  }

  toggleLogoutUser(){
    this.authenticationService.logout();
    this.logoutUser = !this.logoutUser;
  }
}



