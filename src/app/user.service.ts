import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http:HttpClient) { }
  handleLogin(userDetails:User) :Observable<User>
  {
    // console.log(user)
    return this.http.post<User>('http://localhost:8080/api/user/login',userDetails);

  }
  addDetails(userDetails:User){
    return this.http.post('http://localhost:8080/api/user/createuser',userDetails);
  }
}
