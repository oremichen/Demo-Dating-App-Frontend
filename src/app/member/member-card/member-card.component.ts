import { Component, Input, OnInit } from '@angular/core';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Members

  constructor() { }

  ngOnInit(): void {
  }

}
