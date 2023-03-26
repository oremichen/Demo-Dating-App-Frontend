import { Component, OnInit } from '@angular/core';
import { MessageService } from '../Services/Api/api/message.service';
import { MessageDto } from '../Services/Api/model/messageDto';
import { MessageParams } from '../Services/Api/model/messageParams';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  curentUserId: number;
  recepientId: number;
  userName: string;
  messages: MessageDto[]=[];
  container = "Inbox";

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.userName = user.name
    this.loadMessages()
  }

  loadMessages(){
    let mess: MessageParams = {
      container: "Unread",
      username: this.userName

    }
    this.messageService.getUserMessages(mess).subscribe({
      next: response=>{
        this.messages = response
      }
    })
  }
}
