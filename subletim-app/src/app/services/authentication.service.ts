import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../components/user/user";
import {Headers} from "@angular/http";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userName, password) {
    return this.http.post<any>('/userRoute/user/authenticate', { userName, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user) {
    return this.http.post<any>('/userRoute/user/register', user)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  updateUser(userId,user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/userRoute/user/'+userId, JSON.stringify(user))
      .map(res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.currentUserSubject.next(user);
        return res
      });
  }
}
