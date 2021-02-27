import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
  }

  register(){
   this.createUser.dateCreated = new Date
    this._usersService.apiUsersCreateNewUserPost(this.createUser).subscribe(res=>{
      this.user = res
      console.log(this.user)
      this.cancel()
      alert("Restration was successful, you can now login");
    }, error => console.log(error.error))
  }

  cancel(){
    this.cancelToHomePage.emit(false)
  }

}
