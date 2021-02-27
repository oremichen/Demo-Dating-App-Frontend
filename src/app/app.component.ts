import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/Api/api/authentication.service';
import { UserDto } from './Services/Api/model/userDto';
import { UsersDto } from './Services/Api/model/usersDto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: UsersDto[]=[]

  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    this.setCurrentUsers()
  }

  setCurrentUsers(){
     const user: UserDto = JSON.parse(localStorage.getItem('user'))
      this.authService.setCurrentUsers(user)
    }

 
}
