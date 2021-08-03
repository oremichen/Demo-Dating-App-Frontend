import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Api/api/api';
import { MembersService } from 'src/app/Services/Api/api/members.service';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Members[]=[]

  constructor(public _userservice:UsersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){
    this._userservice.apiUsersGetAllUsersGet().subscribe(res=>{
      console.log("result", res)
      this.members = res
    })
  }

  loadMember(id: number){
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      console.log("member", res)
    })
  }
}
