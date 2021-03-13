import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../Services/Api';
import { CreateUsersDto } from '../Services/Api/model/createUsersDto';
import { UserDto } from '../Services/Api/model/userDto';
import { UsersDto } from '../Services/Api/model/usersDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() cancelToHomePage = new EventEmitter()

  model: any={}
  user: UserDto={}
  createUser: CreateUsersDto={}

  constructor(private _usersService: UsersService,  private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
   this.createUser.dateCreated = new Date
    this._usersService.apiUsersCreateNewUserPost(this.createUser).subscribe(res=>{
      this.user = res
      console.log(this.user)
      this.cancel()
      this.toastr.success("Registration was successful, check your mail");
    }, error => console.log(error.error))
    this.toastr.error("Error! Something went wrong, check input and try again");
  }

  cancel(){
    this.cancelToHomePage.emit(false)
  }

}
