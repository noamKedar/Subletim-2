import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApartmentService} from "../../services/apartment.service";
import {Apartment} from "../apartmentComponent/apartment";

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
  owner: string = "";
  roomNumber: number;

  @Input() apartmentToEdit;
  @Output() apartmentToEditChange = new EventEmitter<boolean>();
  @Input() createOrEdit;
  @Output() createOrEditChange = new EventEmitter<boolean>();
  @Output() showAddApartmentChange = new EventEmitter<boolean>();

  constructor(private apartmentService:ApartmentService) {
  }

  ngOnInit() {
    if (this.apartmentToEdit) {
      this.apartmentName = this.apartmentToEdit.apartmentName;
      this.address = this.apartmentToEdit.address;
      this.city = this.apartmentToEdit.city;
      this.roomNumber = this.apartmentToEdit.roomNumber;
      this.owner = this.apartmentToEdit.owner;
    }
  }

  async addOrUpdateApartment(event) {
    event.preventDefault();
    if (this.apartmentToEdit) {
      await this.updateApartment();
    } else {
      this.addApartment();
    }
    this.apartmentToEditChange.emit(null);
    this.createOrEditChange.emit(false);

  }

  addApartment(){
    const newApartment = {
      apartmentName: this.apartmentName,
      address: this.address,
      city: this.city,
      roomNumber: this.roomNumber,
      owner: this.owner
    };

    this.apartmentService.addApartment(newApartment)
      .subscribe(apartment => {
        this.apartmentName = '';
        this.address = '';
        this.city = '';
        this.roomNumber = 0;
        this.owner = '';
      });
  }

  async updateApartment() {
    var _apartment = {
      _id: this.apartmentToEdit._id,
      apartmentName: this.apartmentName,
      address: this.address,
      city: this.city,
      roomNumber: this.roomNumber,
      owner: this.owner,
    };
    await this.apartmentService.updateApartment(_apartment).subscribe();
  }

  valid() {
    return (this.apartmentName && this.address && this.city && this.roomNumber && this.owner);
  }

  returnToMainPage() {
    this.showAddApartmentChange.emit(false);
  }
}
