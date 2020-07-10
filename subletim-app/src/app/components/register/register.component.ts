import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  userName: string = "";
  phoneNumber: number;
  password: string = "";
  @Output() showRegisterChange = new EventEmitter<boolean>();
  cancel: boolean = false;
  registerUser: boolean = false;
  private user: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
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

  async addUser() {
    this.submitted = true;
    if (this.user) {
      this.user.clean
    }
    await this.innerRegister()
  }

  innerRegister() {
    this.authenticationService.register(this.registerForm.value)
      .subscribe(user => {
        this.user = user
        if (this.user && !this.validateResult()) {
          this.registerUser = !this.registerUser;
        }
      });
  }

  get f() {
    return this.registerForm.controls;
  }

  valid() {
    return (!this.registerForm.invalid);
  }

  toggleCancel() {
    this.cancel = !this.cancel
  }

  validateResult() {
    return this.user === "Username already exists";
  }
}
