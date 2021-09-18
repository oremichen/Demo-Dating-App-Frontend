import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { UsersService } from 'src/app/Services/Api/api/api';
import { Members } from 'src/app/Services/Api/model/members';
import { Pagenation } from 'src/app/Services/Api/model/pagenation';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Members[]=[]
  pagenation: Pagenation
  pageNumber = 1
  pageSize= 5

  constructor(public _userservice:UsersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){

    this._userservice.apiUsersGetAllUsersGet().subscribe(res=>{
      this.members = res.result
      this.pagenation = res.pagenation
    })
  }

  
}
