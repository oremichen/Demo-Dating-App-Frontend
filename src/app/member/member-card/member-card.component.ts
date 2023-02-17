import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { nextTick } from 'process';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Members

  user: any;

  constructor(private _userservice:UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
   
  }

  like(){
    
    this._userservice.like(this.user.id, this.member.id).subscribe({
      next: (res)=>{
        if(res) this.toastr.success('You have liked' + this.member.knownAs)
      }
    })
  }

}
