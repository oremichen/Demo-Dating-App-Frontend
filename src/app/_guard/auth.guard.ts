import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../Services/Api/api/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authenticate: AuthenticationService, private _router: Router){

  }

  canActivate(): Observable<boolean> {
      return this._authenticate.currentUser$.pipe(
        map(user=> {
          if(user) {return true}

          this._router.navigate(['/home'])
          return false
        })
      )
  }
  
}
