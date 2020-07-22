import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "../subletComponent/sublet";
import {ApartmentService} from "../../services/apartment.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'view-sublet',
  templateUrl: './viewSublet.component.html',
  providers: [SubletService],
  styleUrls: ['./viewSublet.component.css']
})

export class ViewSubletComponent {
  sublet: Sublet;
  @Input() subletToShow;
  @Output() subletToViewChange = new EventEmitter<object>();
  @Output() showViewSubletChange = new EventEmitter<boolean>();
  isAddSublet: boolean = false;

  constructor(private subletService: SubletService, private apartmentService: ApartmentService, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.sublet = this.subletToShow;
  }

  returnToMainPage() {
    this.showViewSubletChange.emit(false);
  }

  back() {
    this.subletToViewChange.emit(null);
  }
}
