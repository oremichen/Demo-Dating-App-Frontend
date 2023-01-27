import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsersService } from 'src/app/Services/Api/api/api';
import { AuthenticationService } from 'src/app/Services/Api/api/authentication.service';
import { Members } from 'src/app/Services/Api/model/members';
import { Pagenation } from 'src/app/Services/Api/model/pagenation';
import { UserDto } from 'src/app/Services/Api/model/userDto';
import { UserParams } from 'src/app/Services/Api/model/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Members[]=[]
  pagenation: Pagenation={}
  Id: number
  userParams: UserParams;
  user: UserDto;
  genderList= [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}]

  constructor(public _userservice:UsersService, public authenticationService: AuthenticationService) 
  {
    this.userParams = this._userservice.getUserParams();
   }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.Id = user.id
    this.loadMembers()
  }

  loadMembers(){
    this._userservice.apiUsersGetAllUsersGet(this.userParams, this.Id).subscribe(res=>{
      this.members = res.result
      this.pagenation = res.pagenation
    })
  }

  resetFilters(){
    this.userParams = this._userservice.resetUserParams()
    this.loadMembers()
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this._userservice.setUserParams(this.userParams)
    this.loadMembers()
  }
  
}
