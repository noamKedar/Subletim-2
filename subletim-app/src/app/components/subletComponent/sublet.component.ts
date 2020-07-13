import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "./sublet";
import {ApartmentService} from "../../services/apartment.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'sublets',
  templateUrl: './sublet.component.html',
  providers: [SubletService],
  styleUrls: ['./sublet.component.css']
})

export class SubletsComponent {
  sublets: Sublet[];
  subletsWithoutSearch: Sublet[];
  subletToEdit: number;
  createOrEdit: boolean = false;
  @Output() showSubletsListChange = new EventEmitter<boolean>();

  constructor(private subletService:SubletService, private apartmentService: ApartmentService) {
    this.subletService.getSublets()
      .subscribe(sublets => {
        this.apartmentService.getApartments().subscribe(apartments => {
          const apartmentsDict = {};
          apartments.forEach(apartment => {
            apartmentsDict[apartment._id] = apartment;
          });
          sublets.forEach(sublet => {
            sublet.apartmentObject = apartmentsDict[sublet.apartment]
          });
          this.sublets = sublets;
        });
      });
  }

  addNewSublet() {
    this.subletToEdit = null;
    this.createOrEdit = true;
  }

  finishedAddingOrCreate() {
    this.subletService.getSublets()
      .subscribe(sublets => {
        this.sublets = sublets;
      });
    this.subletToEdit = null;
    this.createOrEdit = false;
  }

  deleteSublet(id){
    var sublets = this.sublets;
    this.subletService.deleteSublet(id).subscribe(data => {
      if(data.n == 1){
        for(var i = 0;i < sublets.length;i++){
          if(sublets[i]._id == id){
            sublets.splice(i, 1);
          }
        }
      }
    });
  }

  editSublet(sublet){
    this.subletToEdit = sublet;
    this.createOrEdit = true;
  }

  returnToMainPage() {
    this.showSubletsListChange.emit(false);
  }

  searchSublet(){
    this.subletToEdit = null;
    this.createOrEdit = false;

    let startDate = (<HTMLInputElement>document.getElementById("startDateTxt")).value
    let endDate = (<HTMLInputElement>document.getElementById("endDateTxt")).value
    let price = (<HTMLInputElement>document.getElementById("priceTxt")).value

    let res = this.subletService.searchSublet(startDate, endDate, price).subscribe(sublets => {
      this.subletsWithoutSearch = this.sublets;
      this.sublets = sublets;
    });
  }
}
