import {Component} from "@angular/core";
import {ApartmentService} from '../../services/apartment.service'
import {Apartment} from './apartment'

@Component({
  selector: 'apartment',
  templateUrl: 'apartment.components.html',
  providers: [ApartmentService],
  styleUrls: ['./apartment.component.css']
})

export class ApartmentComponents {
  apartments: Apartment[];
  apartmentsWithoutSearch: Apartment[];
  apartmentToEdit: number;
  createOrEdit: boolean = false;

  constructor(private apartmentService: ApartmentService) {
    this.apartmentService.getApartments()
      .subscribe(apartments => {
        this.apartments = apartments;
      });
  }

  addNewApartment() {
    this.apartmentToEdit = null;
    this.createOrEdit = true;
  }

  finishedAddingOrCreate(){
    this.apartmentService.getApartments()
      .subscribe(apartments => {
        this.apartments = apartments;
      });
  console.log('got here 4');
  this.apartmentToEdit = null;
  this.createOrEdit = false;
}

deleteApartment(id){
  var apartments = this.apartments;
  this.apartmentService.deleteApartment(id).subscribe(data => {
    if(data.n == 1){
      for(var i = 0;i < apartments.length;i++){
        if(apartments[i]._id == id){
          apartments.splice(i, 1);
        }
      }
    }
  });
}

editApartment(apartment){
  this.apartmentToEdit = apartment;
  this.createOrEdit = true;
}

  searchApartment(){
    this.apartmentToEdit = null;
    this.createOrEdit = false;

    let city = (<HTMLInputElement>document.getElementById("cityTxt")).value
    let address = (<HTMLInputElement>document.getElementById("addressTxt")).value
    let rooms = (<HTMLInputElement>document.getElementById("roomTxt")).value

    let res = this.apartmentService.searchApartment(city, address, rooms).subscribe(apartments => {
      this.apartmentsWithoutSearch = this.apartments;
      this.apartments = apartments;
    });
  }

}
