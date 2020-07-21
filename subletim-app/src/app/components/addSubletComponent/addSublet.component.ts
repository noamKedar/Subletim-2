import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "../subletComponent/sublet";
import {Apartment} from "../apartmentComponent/apartment";
import {ApartmentService} from "../../services/apartment.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'add-sublet',
  templateUrl: './addSublet.component.html',
  providers: [SubletService],
  styleUrls: ['./addSublet.component.css']
})

export class AddSubletComponent {
  subletName: string = "";
  startDate: Date;
  endDate: Date;
  price: number;
  apartment: Apartment;
  apartments: Apartment[];
  @Input() subletToEdit;
  @Output() subletToEditChange = new EventEmitter<boolean>();
  @Input() createOrEdit;
  @Output() createOrEditChange = new EventEmitter<boolean>();
  @Output() showAddSubletChange = new EventEmitter<boolean>();
  isAddSublet: boolean = false;

  constructor(private subletService: SubletService, private apartmentService: ApartmentService, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    if (this.authenticationService.currentUserValue.isAdmin === true) {
      this.apartmentService.getApartments().subscribe(apartments => {
          this.apartments = apartments;
          this.initSubletToEdit();
        }
      )
    } else {
      this.apartmentService.getUserApartments(this.authenticationService.currentUserValue._id).subscribe(apartments => {
        this.apartments = apartments;
        this.initSubletToEdit();
      })
    }
  }

  initSubletToEdit() {
    if (this.subletToEdit) {
      this.subletName = this.subletToEdit.subletName;
      this.startDate = this.subletToEdit.startDate;
      this.endDate = this.subletToEdit.endDate;
      this.price = this.subletToEdit.price;
      this.apartment = this.apartments.filter(apartment => apartment._id === this.subletToEdit.apartment)[0];
      this.isAddSublet = false;
    } else {
      this.isAddSublet = true;
    }
  }

  async addOrUpdateSublet(event) {
    event.preventDefault();
    if (this.subletToEdit) {
      await this.updateSublet();
    } else {
      this.addSublet();
    }
    this.subletToEditChange.emit(null);
    this.createOrEditChange.emit(false);
    this.returnToMainPage();
  }

  addSublet() {
    const newSublet = {
      subletName: this.subletName,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      apartment: this.apartment._id
    };

    this.subletService.addSublet(newSublet)
      .subscribe(sublet => {
        this.subletName = '';
        this.startDate = null;
        this.endDate = null;
        this.price = 0;
        this.apartment = null;
      });
  }

  async updateSublet() {
    var _sublet = {
      _id: this.subletToEdit._id,
      subletName: this.subletName,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      apartment: this.apartment._id,
    };
    await this.subletService.updateSublet(_sublet).subscribe();
  }

  valid() {
    return (this.subletName && this.startDate && this.endDate && this.price && this.apartment);
  }

  updateStartDate(event) {
    this.startDate = new Date(event);
  }

  updateEndDate(event) {
    this.endDate = new Date(event);
  }

  returnToMainPage() {
    this.showAddSubletChange.emit(false);
  }
}
