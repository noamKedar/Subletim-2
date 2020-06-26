import {Component} from "@angular/core";
import {ApartmentService} from '../services/apartment.service'
import {Apartment} from './apartment'

// import {User} from './User'

@Component({
  selector: 'apartment',
  templateUrl: 'apartment.components.html'
})

export class ApartmentComponents {
  id: object;
  apartments: Apartment[];
  address: string;
  apartmentName: string;
  city: string;
  //owner: User;
  roomNumber: number;

  constructor(private apartmentService: ApartmentService) {
    this.apartmentService.getApartments()
      .subscribe(apartments => {
        this.apartments = apartments;
      });
  }

  addApartment(event) {
    event.preventDefault();
    var newApartment = {
      id: this.id,
      address: this.address,
      apartmentName: this.apartmentName,
      city: this.city,
      //owner: this.User,
      roomNumber: this.roomNumber
    }
    this.apartmentService.addApartment(newApartment)
      .subscribe(apartment => {
        this.apartments.push(apartment);
      })
  }

  deleteApartment(id) {
    var apartments = this.apartments;
    this.apartmentService.deleteApartment(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < apartments.length; i++) {
            if (apartments[i]._id == id) {
              apartments.splice(i, 1);
            }
          }
        }
      })
  }

  updateApartment(apartment) {
    var _apartment = {
      id: apartment.id,
      address: apartment.address,
      apartmentName: apartment.apartmentName,
      city: apartment.city,
      //owner: apartment.User,
      roomNumber: apartment.roomNumber
    };
    this.apartmentService.updateApartment(_apartment);
  }
}


