import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class CmsService {
  constructor(private http: Http) {
  }

  getApartmentStat() {
    return this.http.get('/cmsRoute/apartmentsStat')
      .map(res => {
        console.log(res.json())
        return res.json()});
  }
}
