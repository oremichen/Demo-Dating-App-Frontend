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
    let id = parseInt(this._route.snapshot.paramMap.get('id'))
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      this.member = res
      this.galleryImages= this.getImages();
    })
  }

}
