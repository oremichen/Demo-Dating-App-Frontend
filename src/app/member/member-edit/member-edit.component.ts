import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';
import { MembersDto } from 'src/app/Services/Api/model/membersDto';
import { UpdateMembersDto } from 'src/app/Services/Api/model/updateMembersDto';
import { UserDto } from 'src/app/Services/Api/model/userDto';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm
  member: Members
  user: any
  memeberDto: UpdateMembersDto={}
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue= true;
    }
  }

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
    this.memeberDto.id = this.member.id
    this.memeberDto.introduction = this.member.introduction
    this.memeberDto.interests = this.member.interests
    this.memeberDto.city = this.member.city
    this.memeberDto.lookingFor = this.member.lookingFor
    this.memeberDto.dateCreated = this.member.dateCreated
    this.memeberDto.dateOfBirth = this.member.dateOfBirth
    this.memeberDto.gender = this.member.gender
    this.memeberDto.knownAs = this.member.knownAs
    this.memeberDto.lastAcvtive = this.member.lastAcvtive
    this.memeberDto.name = this.member.name

    console.log("==>", this.memeberDto)
    this._userservice.apiUsersUpdateUserPut(this.memeberDto).subscribe((res: string)=>{
      let result = res
      this._toastr.success("Profile updated successfully")
      this.loadMember(this.user.id)
      this.editForm.reset(this.member)
    }, error=>{
      this._toastr.error("Ooops!! Profile update failed")
    })

  }
}
