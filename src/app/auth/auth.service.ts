import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pUser = new BehaviorSubject(null);
  currentUser = this.pUser.asObservable();

  constructor(private httpClient: HttpClient) {
    let storedProp = localStorage.getItem('storedProp');
    if (storedProp)
      this.setUser(JSON.parse(storedProp), false);
  }
  
  login(email, password){
    const user = {
      usuario: email,
      senha: password
    }  
    return this.httpClient.post('http://localhost:3000/v1/login',user);
  }

  createAccount(email, password) {
    const user = {
      usuario: email,
      senha: password
    }
    return this.httpClient.post('http://localhost:3000/v1/register',user);
  }

  setUser(user, storeProp: boolean = false){
    if (storeProp)
      localStorage.setItem('storedProp', JSON.stringify(user));
    this.pUser.next(user);
  }

  getUser() {
    return this.pUser;
  }
}
