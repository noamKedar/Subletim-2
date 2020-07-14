import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'update-user',
  templateUrl: './updateUser.component.html',
  providers: [UserService],
  styleUrls: ['./updateUser.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  submitted = false;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: number;
  password: string = "";
  @Output() showEditUserChange = new EventEmitter<boolean>();
  cancel: boolean = false;
  editUser: boolean = false;
  private user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      password: [this.user.password, Validators.required],
      userName: [{value: this.user.userName, disabled: true}]
    });
  }

  async updateUser() {
    this.submitted = true;
    await this.innerUpdate()
  }

  innerUpdate() {
    this.authenticationService.updateUser(this.user._id,this.updateForm.value)
      .subscribe(user => {
        this.user = user
        if (this.user) {
          this.editUser = !this.editUser;
        }
      });
  }

  get f() {
    return this.updateForm.controls;
  }

  valid() {
    return (!this.updateForm.invalid);
  }

  toggleCancel() {
    this.cancel = !this.cancel
  }
}
