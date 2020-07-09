import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "../subletComponent/sublet";


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
  apartment: string = "";
  @Input() subletToEdit;
  @Output() subletToEditChange = new EventEmitter<boolean>();
  @Input() createOrEdit;
  @Output() createOrEditChange = new EventEmitter<boolean>();
  @Output() showAddSubletChange = new EventEmitter<boolean>();

  constructor(private subletService:SubletService) {
  }

  ngOnInit() {
    if (this.subletToEdit) {
      this.subletName = this.subletToEdit.subletName;
      this.startDate = this.subletToEdit.startDate;
      this.endDate = this.subletToEdit.endDate;
      this.price = this.subletToEdit.price;
      this.apartment = this.subletToEdit.apartment;
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
  }

  addSublet(){
    const newSublet = {
      subletName: this.subletName,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      apartment: this.apartment
    };

    this.subletService.addSublet(newSublet)
      .subscribe(sublet => {
        this.subletName = '';
        this.startDate = null;
        this.endDate = null;
        this.price = 0;
        this.apartment = '';
      });
  }

  async updateSublet() {
    var _sublet = {
      _id: this.subletToEdit._id,
      subletName: this.subletName,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      apartment: this.apartment,
    };
    await this.subletService.updateSublet(_sublet).subscribe();
  }

  valid() {
    return (this.subletName && this.startDate && this.endDate && this.price && this.apartment);
  }

  returnToMainPage() {
    this.showAddSubletChange.emit(false);
  }
}
