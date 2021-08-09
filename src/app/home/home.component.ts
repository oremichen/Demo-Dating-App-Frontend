import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/Api/api/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false

  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.authenticationService.logout()
  }

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  cancel(value: boolean){
    this.registerMode = value
  }
  
}
