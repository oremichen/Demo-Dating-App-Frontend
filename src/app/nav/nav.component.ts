import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Services/Api/api/authentication.service';
import { LoginUser } from '../Services/Api/model/loginUser';
import { Responses } from '../Services/Api/model/response';
import { UserDto } from '../Services/Api/model/userDto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  password: string=""
  userPassword: string="password"
  username: string="";
  name: string
  fieldTextType: boolean=true;
  loginUser: LoginUser={}
  userDto: UserDto={}
  response: Responses={}
  isSuccessful: boolean= true
  isNotSuccessful: boolean= true
  loggedin: boolean= false

  constructor(public authenticationService: AuthenticationService, private _router: Router, 
              private toastr: ToastrService) { }

    ngOnInit(): void {
      this.getCurrentUser()
    }

    getCurrentUser(){
      this.authenticationService.currentUser$.subscribe(user=>{
       if(user!= null){
        this.name = user.name.toLocaleLowerCase()
        this.login
        return
       }
      })
    }
    
    login(){
      this.authenticationService.loginPost(this.loginUser).subscribe(res=>{
          this.loggedin = true
          this.toastr.success("Success!!")
          this.gotoMemberPage()
        
      }, error =>{
          console.log(error.error)
          this.toastr.error("Something went wrong, please check connection or input data and try again")
          
      })
    }


    logout(){
      this.loggedin = false
      this.authenticationService.logout()
      this._router.navigate(['/home'])
    }

    showPassword(){
      this.fieldTextType = !this.fieldTextType;  }

    gotoMemberPage(){
      this._router.navigate(['/member'])
    }

    setIntervalsSuccess(){
      setInterval(() => {
        this.isSuccessful= true
       }, 6000);
    }

    setIntervalsFail(){
      setInterval(() => {
        this.isNotSuccessful= true
       }, 6000);
    }
}
