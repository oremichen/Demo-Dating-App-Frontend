import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Services/Api';
import { Members } from '../Services/Api/model/members';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  predicate = 'liked'
  members: Members[]=[]
  id: number

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.id = user.id
  }

  loadLikes(){
    this.userService.getLikedUsers(this.predicate, this.id).subscribe({
      next: response=> {
        console.log({response})
      }
    })
  }
}
