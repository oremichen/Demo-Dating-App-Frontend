import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/Api/api/authentication.service';
import { UserDto } from '../Services/Api/model/userDto';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: UserDto
    
    this.authservice.currentUser$.pipe(take(1)).subscribe(res=>{
      
      let user = JSON.parse(localStorage.getItem('user'))
      if(user){
        currentUser = user
        console.log("res", currentUser.token)
  
        request = request.clone({
          setHeaders:{
            Authorization: `Bearer ${currentUser.token}`
          }
        })
      }
    })
    return next.handle(request);
  }
}
