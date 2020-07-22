import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SubletService} from "../../services/sublet.service";
import {Sublet} from "../subletComponent/sublet";
import {ApartmentService} from "../../services/apartment.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Http} from "@angular/http";
import { GoogleMapsModule } from '@angular/google-maps';


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
  @ViewChild('mapContainer', { static: false }) googlemap: ElementRef;
  isAddSublet: boolean = false;
  map: google.maps.Map;

  constructor(private http: Http) {}

  // ANGULAR ON AFTER VIEW LIFECYCLE WILL BE CALLED AFTER OUR LAYOUT DONE RENDERING
  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnInit() {
    this.sublet = this.subletToShow;
    this.mapInitializer();
  }

  mapInitializer() {
    const completeAddress = this.sublet.apartmentObject.address + "," + this.sublet.apartmentObject.city;
    const apiKey = "16e1cbdfd87d0a";
    const requestUrl = "https://eu1.locationiq.com/v1/search.php?key=" + apiKey + "&q=" + completeAddress + "&format=json";
    this.http.get(requestUrl).map(res => res.json()).subscribe(response => {
      const subletAddress = new google.maps.LatLng(response[0].lat, response[0].lon);
      const mapOptions = {
        center: subletAddress,
        zoom: 15,
        minZoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      //Display the Google map in the div control with the defined Options
      const map = new google.maps.Map(this.googlemap.nativeElement, mapOptions);
      //Set Marker on the Map
      const marker = new google.maps.Marker({
        position: subletAddress,
        animation: google.maps.Animation.BOUNCE,
      });
      marker.setMap(map);
    })
  }

  returnToMainPage() {
    this.showViewSubletChange.emit(false);
  }

  back() {
    this.subletToViewChange.emit(null);
  }
}
