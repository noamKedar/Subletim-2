import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

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
  loginUser: boolean = false;
  register: boolean = false;
  @Output() showLoginChange = new EventEmitter<boolean>();
  private user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  async login(){
    this.submitted = true;
    if (this.user){
      this.user.clean
    }
    await this.innerLogin()
  }

  innerLogin(){
  this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(user => {
        this.user = user
        if (this.user && !this.validateResult()){
          this.loginUser = !this.loginUser;
        }
      });
  }
  get f() { return this.loginForm.controls; }

  valid() {
    return (!this.loginForm.invalid);
  }

  validateResult() {
    return this.user === "Username or password is incorrect" ;
  }

  toggleRegister() {
    this.register = !this.register;
  }
}
