import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  userName: string = "";
  phoneNumber: number;
  password: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.pattern("[0-9 ]{10}")],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  addUser(){
    this.submitted = true;

    this.userService.register(this.registerForm.value)
      .subscribe(user => {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.userName = '';
        this.phoneNumber = null;
        this.password = '';
      });
  }

  get f() { return this.registerForm.controls; }
  valid() {
    return (!this.registerForm.invalid);
  }
}
