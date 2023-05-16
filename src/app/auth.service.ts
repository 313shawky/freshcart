import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if(localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }
  }

  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  userData = new BehaviorSubject(null);

  register(registerData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signup`, registerData)
  }

  login(loginData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signin`, loginData)
  }

  signout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
