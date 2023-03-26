import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Services/Api/api/message.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
