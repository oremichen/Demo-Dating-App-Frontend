import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../Services/Api';
import { CreateUsersDto } from '../Services/Api/model/createUsersDto';
import { UserDto } from '../Services/Api/model/userDto';

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
  registerForm: FormGroup

  constructor(private _usersService: UsersService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      confirmPassword: new FormControl('', [
        this.matchValues('password')
      ])

    })

    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    console.log(this.registerForm.value)
    console.log(this.registerForm.status)
  //  this.createUser.dateCreated = new Date
  //   this._usersService.apiUsersCreateNewUserPost(this.createUser).subscribe(res=>{
  //     this.user = res
  //     console.log(this.user)
  //     this.cancel()
  //     this.toastr.success("Registration was successful, check your mail");
  //   }, (error) =>{
  //     console.log(error.error)
  //     this.toastr.error("Error! Something went wrong, check input and try again");
  //     })
  }

  cancel(){
    this.cancelToHomePage.emit(false)
  }

}
