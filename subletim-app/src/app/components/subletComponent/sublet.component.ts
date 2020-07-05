import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "./sublet";


@Component({
  selector: 'sublets',
  templateUrl: './sublet.component.html',
  providers: [SubletService],
  styleUrls: ['./sublet.component.css']
})

export class SubletsComponent {
  sublets: Sublet[];
  subletToEdit: number;
  createOrEdit: boolean = false;
  @Output() showSubletsListChange = new EventEmitter<boolean>();

  constructor(private subletService:SubletService) {
    this.subletService.getSublets()
      .subscribe(sublets => {
        this.sublets = sublets;
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
}
