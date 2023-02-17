import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Api/api/api';
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
  id: number
  userParams: UserParams;
  user: UserDto;
  genderList= [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}]

  constructor(private _userservice:UsersService) 
  {
    this.userParams = this._userservice.getUserParams();
   }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.id = user.id
    this.loadMembers()
  }

  loadMembers(){
    this._userservice.apiUsersGetAllUsersGet(this.userParams, this.id).subscribe(res=>{
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
