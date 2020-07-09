import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthenticationService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userName: string = "";
  password: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private  userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  loginUser(){
    this.submitted = true;

    this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(user => {
        this.userName = '';
        this.password = '';
      });
  }
  get f() { return this.loginForm.controls; }

  valid() {
    return (!this.loginForm.invalid);
  }
}
