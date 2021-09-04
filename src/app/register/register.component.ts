import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  maxDate: Date;
  validationErrors: string=''

  constructor(private _usersService: UsersService,  private toastr: ToastrService, private fb: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)]],
      confirmPassword: ['', [
        this.matchValues('password')
      ]]

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
    this.createUser.dateCreated = new Date
    this._usersService.apiUsersCreateNewUserPost(this.registerForm.value).subscribe(res=>{
      this.user = res
      this._router.navigateByUrl('/member')
      //this.cancel()
      this.toastr.success("Registration was successful, check your mail");
    }, (error) =>{
     this.validationErrors = "Registration failed, try again"
   
      })
  }

  cancel(){
    this.cancelToHomePage.emit(false)
  }

  close(){
    this.validationErrors = ""
  }

}
