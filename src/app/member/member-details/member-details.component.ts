import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { UsersService } from 'src/app/Services/Api';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Members
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _userservice:UsersService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember()

    this.galleryOptions=[
      {
        width:'500px',
        height: '500px',
        previewDescription: true,
        preview: false,
        thumbnailsColumns: 4,            //this will come from the number of images in the databse
        imageAnimation: NgxGalleryAnimation.Slide
        
      }
    ]
  }

  getImages(){
    
  }

  loadMember(){
    let id = parseInt(this._route.snapshot.paramMap.get('id'))
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      console.log("member", res)
      this.member = res
    })
  }

}
