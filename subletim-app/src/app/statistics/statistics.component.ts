import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CmsService} from "../services/cms.service";
import {customPipe} from './MyCustomPipe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AuthenticationService} from "../services/authentication.service";

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @Output() showStats = new EventEmitter<boolean>();
  apartmentStat: any;
  @Input() usersCount;

  constructor(private cmsService: CmsService, private authenticationService: AuthenticationService) {
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

  updateUserCount() {
    this.authenticationService.updateUsersByAdmin(this.usersCount);
  }
}
