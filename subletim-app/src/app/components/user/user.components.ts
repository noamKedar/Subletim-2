import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from './user';
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'user',
  templateUrl: 'user.components.html',
  providers: [UserService],
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[];
  currentUser: User;
  @Output() showUserChange = new EventEmitter<boolean>();

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
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

  searchUser(){
    let userName = (<HTMLInputElement>document.getElementById("userName")).value
    let phoneNumber = (<HTMLInputElement>document.getElementById("phone")).value
    let email = (<HTMLInputElement>document.getElementById("email")).value

    let res = this.userService.searchUser(userName, phoneNumber, email).subscribe(users => {
      this.users = users;
    });

  }
  returnToMainPage() {
    this.showUserChange.emit(false);
  }

  isNotCurrentUser(user: User) {
    return user.userName != this.currentUser.userName;
  }
}

