import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/Services/Api/api/message.service';
import { CreateMessageDto } from 'src/app/Services/Api/model/createMessageDto';
import { MessageDto } from 'src/app/Services/Api/model/messageDto';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {

  constructor(private messageService: MessageService, private _route: ActivatedRoute) { }

  @Input() recepientID: number;
  currentUserID: number;
  messages: MessageDto[]=[];
  content: string = '';
 

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.currentUserID = user.id
    this.loadMessages()
  }

  loadMessages(){
    this.messageService.getMessageThread(this.currentUserID, this.recepientID).subscribe({
      next: response=>{
        this.messages = response
      }
    })
  }

  sendMessage(){
    var message: CreateMessageDto = {
      recepientId: this.recepientID,
      senderId: this.currentUserID,
      content: this.content
    }
    this.messageService.addMessage(message).subscribe({
      next:(data)=>{
        this.content = ""
        console.log({data})
      }
    })
  }

}
