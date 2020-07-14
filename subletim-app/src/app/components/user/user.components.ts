import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from './user';

@Component({
  selector: 'user',
  templateUrl: 'user.components.html'
})
export class UserComponent {
  users: User[];
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;

  constructor(private userService: UserService) {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  addUser(event) {
    event.preventDefault();
    var newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      password: this.password
    }
    this.userService.addUser(newUser)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  deleteUser(id) {
    var users = this.users;
    this.userService.deleteUser(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < users.length; i++) {
          if (users[i]._id == id) {
            users.splice(i, 1);
          }
        }
      }
    });
  }

}

