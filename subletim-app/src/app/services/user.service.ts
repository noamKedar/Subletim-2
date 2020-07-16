import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class UserService{
  constructor(private http:Http){
    console.log('User Service Initialized...');
  }
  getUsers(){
    return this.http.get('/userRoute/users')
      .map(res => res.json());
  }
  addUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/userRoute/user', JSON.stringify(newUser), {headers: headers})
      .map(res => res.json());
  }
  deleteUser(id){
    return this.http.delete('/userRoute/user/'+id)
      .map(res => res.json());
  }

  searchUser(userName, phoneNumber, email){
    var config = {params: {userName:userName, phoneNumber:phoneNumber, email:email}}
    return this.http.get('userRoute/searchUser',  config)
      .map(res => res.json());
  }
}
