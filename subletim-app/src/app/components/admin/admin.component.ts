import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from "../user";
import {AuthenticationService } from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  providers: [UserService,AuthenticationService ],
  styleUrls: ['./admin.component.css']})
export class AdminComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getUsers()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
