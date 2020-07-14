import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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

}
