import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../Services/Api';
import { MessageService } from '../Services/Api/api/message.service';
import { Members } from '../Services/Api/model/members';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Members> {
  constructor(private _userservice:UsersService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Members> {
    return this._userservice.apiUsersGetUserByIdGet(parseInt(route.paramMap.get('id')));
  }
}
