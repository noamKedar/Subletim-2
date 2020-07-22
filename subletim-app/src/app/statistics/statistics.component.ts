import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CmsService} from "../services/cms.service";
import {customPipe} from './MyCustomPipe';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']

})
export class StatisticsComponent implements OnInit {
  @Output() showStats = new EventEmitter<boolean>();
  apartmentStat: any;

  constructor(private cmsService: CmsService) {
    this.setApartmentsStat()
  }

  ngOnInit(): void {
  }

  returnToMainPage() {
    this.showStats.emit(false);
  }

  setApartmentsStat() {
    this.cmsService.getApartmentStat().subscribe(res => {
      console.log("setap")
      console.log(res)
      this.apartmentStat = res
    })
    console.log(this.apartmentStat)
  }
}
