import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';
import { UserDto } from 'src/app/Services/Api/model/userDto';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Members
  user: any

  constructor(private _userservice: UsersService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
   
    this.user = user
    console.log("user", this.user)
    this.loadMember(this.user.id)
  }

  loadMember(id: number){
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      console.log("result", res)
      this.member = res
    })
  }
}
