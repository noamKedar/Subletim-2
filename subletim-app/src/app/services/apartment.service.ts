import{Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApartmentService{
  constructor(private http:Http){
    console.log('Apartment Service Initialized...');
  }
  getApartments(){
    return this.http.get('/apartmentRoute/apartments')
      .map(res => res.json());
  }
  addApartment(newApartment){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/apartmentRoute/apartment', JSON.stringify(newApartment), {headers: headers})
      .map(res => res.json());
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
}
