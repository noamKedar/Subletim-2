import{Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class ApartmentService{
  constructor(private http:Http){
    console.log('Apartment Service Initialized...');
  }

  getApartments(){
    return this.http.get('/apartmentRoute/apartments')
      .map(res => res.json());
  }

  getUserApartments(user){
    var config = {params: {user:user}}
    return this.http.get('apartmentRoute/userApartments', config)
      .map(res => res.json());
  }

  addApartment(newApartment){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/apartmentRoute/apartment', JSON.stringify(newApartment), {headers: headers})
      .map(res =>{
        console.log(res)
        return res.json()});
  }

  deleteApartment(id){
    return this.http.delete('/apartmentRoute/apartment/'+id)
      .map(res => res.json());
  }

  updateApartment(apartment){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/apartmentRoute/apartment/'+apartment._id, JSON.stringify(apartment), {headers: headers})
      .map(res => res.json());
  }
  mapReduce(){
    return this.http.get('/apartmentRoute/mapReduce')
      .map(res => res.json());
  }
  searchApartment(city, address, rooms, currentUser, isAdmin){
    let config = {params: {city:city, address:address, rooms:rooms, currentUser:currentUser}}
    if(isAdmin === true) {
      return this.http.get('apartmentRoute/searchApartments', config)
        .map(res => res.json());
    }
    else {
      return this.http.get('apartmentRoute/searchApartmentsNotAdmin', config)
        .map(res => res.json());
    }
  }
}
