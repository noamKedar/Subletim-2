import { Component } from '@angular/core';
import {SubletService} from "../services/sublet.service";
import {Sublet} from "./sublet";


@Component({
  selector: 'sublets',
  templateUrl: './sublet.component.html',
  providers: [SubletService]
})

export class SubletsComponent {
  sublets: Sublet[];
  subletName: string;
  startDate: Date;
  endDate: Date;
  price: number;
  apartment: string;

  constructor(private subletService:SubletService) {
    this.subletService.getSublets()
      .subscribe(sublets => {
        this.sublets = sublets;
      });
  }

  addSublet(event){
    event.preventDefault();
    var newSublet = {
      subletName: this.subletName,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      apartment: this.apartment
    };
    this.subletService.addSublet(newSublet)
      .subscribe(sublet => {
        this.sublets.push(sublet);
        this.subletName = '';
        this.startDate = null;
        this.endDate = null;
        this.price = 0;
        this.apartment = '';
      });
  }

  deleteTask(id){
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

  updateSublet(sublet){
    var _sublet = {
      _id: sublet._id,
      subletName: sublet.subletName,
      startDate: sublet.startDate,
      endDate: sublet.endDate,
      price: sublet.price,
      apartment: sublet.apartment,
    };
    this.subletService.updateSublet(_sublet);
  }
}
