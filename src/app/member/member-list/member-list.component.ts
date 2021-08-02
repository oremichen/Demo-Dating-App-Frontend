import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/Services/Api/api/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(public _members:MembersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){
    this._members.getAllMembers().subscribe(res=>{
      console.log("result", res)
    })
  }
}
