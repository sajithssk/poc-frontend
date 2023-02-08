import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {
  auth: any;

  constructor() { }
  authenticate(email: string, password: string){
    // console.log('before '+this.isUserLoggedIn());
    if(email==="sajith@123" && password==='123'){
      // sessionStorage.setItem('authenticatedUser',email);
      // console.log('after '+this.isUserLoggedIn())
      return true;
    }
    return false;

  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem('firstname')
    return !(user===null)
  }
  logout(){
    sessionStorage.removeItem('firstname')
  }
}
