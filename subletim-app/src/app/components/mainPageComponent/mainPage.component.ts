import {Component, EventEmitter, Output} from "@angular/core";
import {SubletService} from "../../services/sublet.service";
import {User} from "../user/user";
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
  adminPage: boolean = false;
  editUser: boolean = false;
  currentUser: User;
  viewApartments: boolean = false;
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

  toggleAdminPage() {
    this.adminPage = !this.adminPage;
  }

  isAdmin(){
    return this.currentUser.isAdmin;
  }

  toggleEditPage(){
    this.editUser = !this.editUser;
  }

  toggleApartments() {
    this.viewApartments = !this.viewApartments;
  }
}



