import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';
import { MembersDto } from 'src/app/Services/Api/model/membersDto';
import { UserDto } from 'src/app/Services/Api/model/userDto';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Members
  user: any
  memeberDto: MembersDto={}

  constructor(private _userservice: UsersService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
   
    this.user = user
    console.log("user", this.user)
    this.loadMember(this.user.id)
  }

  loadMember(id: number){
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      this.member = res
    })
  }

  updateMember(){
    debugger
    this.memeberDto.introduction = this.member.introduction
    this.memeberDto.interests = this.member.interests
    this.memeberDto.city = this.member.city
    this.memeberDto.lookingFor = this.member.lookingFor
    this.memeberDto.dateCreated = this.member.dateCreated
    this.memeberDto.dateOfBirth = this.member.dateOfBirth
    this.memeberDto.email = this.member.email
    this.memeberDto.gender = this.member.gender
    this.memeberDto.knownAs = this.member.knownAs
    this.memeberDto.lastAcvtive = this.member.lastAcvtive
    this.memeberDto.photo = this.member.photo

    console.log("==>", this.memeberDto)
    this._userservice.updateUserPut(this.memeberDto).subscribe((res: string)=>{
      let result = res
      this._toastr.success("Profile updated successfully")
    }, error=>{
      this._toastr.error("Ooops!! Profile update failed")
    })
  }
}
