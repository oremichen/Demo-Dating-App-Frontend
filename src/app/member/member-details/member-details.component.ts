import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { UsersService } from 'src/app/Services/Api';
import { MessageService } from 'src/app/Services/Api/api/message.service';
import { Members } from 'src/app/Services/Api/model/members';
import { MessageDto } from 'src/app/Services/Api/model/messageDto';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs?: TabsetComponent
  member: Members
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  memberID: number;
  activeTab?: TabDirective;
  currentUserID: number;
  messages: MessageDto[]=[];

  constructor(private _userservice:UsersService, private _route: ActivatedRoute, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.currentUserID = user.id
    this.loadMember()

    this._route.queryParams.subscribe({
      next: params=>{
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryOptions=[
      {
        width:'500px',
        height: '500px',
        previewDescription: true,
        preview: true,
        thumbnailsColumns: 6,            //this will come from the number of images in the databse
        imageAnimation: NgxGalleryAnimation.Slide
        
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageurls = [];
   
    for(const photo of this.member.photo){
      imageurls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
        description: photo?.url
      })
    }
    return imageurls
  }

  loadMember(){
    this.memberID = parseInt(this._route.snapshot.paramMap.get('id'))
    this._userservice.apiUsersGetUserByIdGet(this.memberID).subscribe(res=>{
      this.member = res
      this.galleryImages= this.getImages();
    })
  }

  loadMessages(){
    this.messageService.getMessageThread(this.currentUserID, this.memberID).subscribe({
      next: response=>{
        this.messages = response
      }
    })
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data
    if(this.activeTab.heading == "Messages"){
      this.loadMessages()
    }
  }

  selectTab(heading){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading == heading)!.active = true
    }
  }

}
