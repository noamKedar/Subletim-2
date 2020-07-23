import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApartmentService} from "../../services/apartment.service";
import {FormControl} from "@angular/forms";
import {User} from "../user/user";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'add-apartment',
  templateUrl: './addApartment.component.html',
  providers: [ApartmentService],
  styleUrls: ['./addApartment.component.css']
})

export class addApartmentComponent {
  apartmentName: string = "";
  address: string = "";
  city: string = "";
  owner: User;
  roomNumber: number;
  currentUser: User;

  @Input() apartmentToEdit;
  @Output() apartmentToEditChange = new EventEmitter<boolean>();
  @Input() createOrEdit;
  @Output() createOrEditChange = new EventEmitter<boolean>();
  @Output() showAddApartmentChange = new EventEmitter<boolean>();
  isAddApartment: boolean = false;
  private res: any;
  constructor(private apartmentService:ApartmentService,
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  ngOnInit() {
    if (this.apartmentToEdit) {
      this.apartmentName = this.apartmentToEdit.apartmentName;
      this.address = this.apartmentToEdit.address;
      this.city = this.apartmentToEdit.city;
      this.roomNumber = this.apartmentToEdit.roomNumber;
      this.owner = this.apartmentToEdit.owner;

      this.isAddApartment = false;
    }
    else {
      this.isAddApartment = true;
    }
  }

  async addOrUpdateApartment(event) {
    event.preventDefault();
    if (!this.apartmentToEdit) {
      await this.addApartment();
    } else {
      await this.updateApartment();
    }
    this.apartmentToEditChange.emit(null);
    this.createOrEditChange.emit(false);
    if (this.createOrEditChange.observers.length === 0) {
      this.returnToMainPage();
    }
  }

  async addApartment(){
    const newApartment = {
      apartmentName: (<HTMLInputElement>document.getElementById("nameInp")).value,
      address: (<HTMLInputElement>document.getElementById("addressInp")).value,
      city: (<HTMLInputElement>document.getElementById("cityInp")).value,
      roomNumber: parseInt((<HTMLInputElement>document.getElementById("roomInp")).value),
      owner: this.currentUser._id
    };
    await this.apartmentService.addApartment(newApartment).subscribe(
      res =>{
        this.res = res
        if ( this.res && !this.validateResult()){
          this.apartmentToEditChange.emit(null);
          this.createOrEditChange.emit(false);
          this.returnToMainPage();}
      }
    );

  }

  async updateApartment() {

    const _apartment ={
      _id: this.apartmentToEdit._id,
      apartmentName: (<HTMLInputElement>document.getElementById("nameInp")).value,
      address: (<HTMLInputElement>document.getElementById("addressInp")).value,
      city: (<HTMLInputElement>document.getElementById("cityInp")).value,
      roomNumber: parseInt((<HTMLInputElement>document.getElementById("roomInp")).value),
      owner: this.owner
    };
    await this.apartmentService.updateApartment(_apartment).subscribe();
  }

  valid() {
   let name = (<HTMLInputElement>document.getElementById("nameInp")).value;
   let address =(<HTMLInputElement>document.getElementById("addressInp")).value;
   let city = (<HTMLInputElement>document.getElementById("cityInp")).value;
   let rooms = parseInt((<HTMLInputElement>document.getElementById("roomInp")).value);

   let isValid =  (name && address && city && !isNaN(rooms));
   return isValid;
  }

  returnToMainPage() {
    this.showAddApartmentChange.emit(false);
  }

  validateResult() {
    return this.res === "Apartment already exists";
  }

  back() {
    this.apartmentToEditChange.emit(null);
    this.createOrEditChange.emit(false);
  }
}
