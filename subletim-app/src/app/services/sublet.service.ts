import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpParams} from "@angular/common/http";



@Injectable({
  providedIn: 'root',
})
export class SubletService{
  // @ts-ignore
  constructor(private http:Http) {
  }

  getSublets() {
    return this.http.get('subletRoute/sublets')
      .map(res => res.json());
  }

  addSublet(newTask) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('subletRoute/sublet', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
  }

  deleteSublet(id) {
    return this.http.delete('subletRoute/sublet/'+id)
      .map(res => res.json());
  }

  updateSublet(sublet) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('subletRoute/sublet/'+sublet._id, JSON.stringify(sublet), {headers: headers})
      .map(res => res.json());
  }

  searchSublet(startDate, endDate, price){

    let params = new HttpParams()
      .set("startDate", startDate)
      .set("endDate", endDate)
      .set("price", price)

    var config = {params: {startDate:startDate, endDate:endDate, price:price}}
    return this.http.get('subletRoute/searchSublets',  config)
      .map(res => res.json());
  }

}
