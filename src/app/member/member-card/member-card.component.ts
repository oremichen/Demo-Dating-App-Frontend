import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Members

  constructor(private _userservice:UsersService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // loadMember(id: number){
  //   this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
  //     console.log("member", res)
  //     this._route.snapshot.paramMap.get('id')
  //   })
  // }

}
