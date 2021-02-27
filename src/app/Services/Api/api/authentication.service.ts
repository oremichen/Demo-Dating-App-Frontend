import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http'
import { ServiceUrlConnections } from "src/app/ServiceUrlConnections";
import {map} from 'rxjs/operators'
import { UserDto } from "../model/userDto";
import { ReplaySubject } from "rxjs";

@Injectable()

export class AuthenticationService{
protected basePath = ServiceUrlConnections.serviceUrl;

currentUserSource = new ReplaySubject<UserDto>(1)
currentUser$ = this.currentUserSource.asObservable()

constructor(private httpClient: HttpClient){}

    loginPost(model: any){
        return this.httpClient.post(`${this.basePath}/api/Users/Login`, model).pipe(
            map((response: UserDto)=>{
                const user = response
                if(user){
                    localStorage.setItem('user', JSON.stringify(user))
                    this.currentUserSource.next(user)
                    }
                })
            )
    }

    logout(){
        localStorage.removeItem('user')
        this.currentUserSource.next(null)
      }

    setCurrentUsers(user: UserDto){
    this.currentUserSource.next(user)
  }
}