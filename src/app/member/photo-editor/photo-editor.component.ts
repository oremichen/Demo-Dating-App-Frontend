import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from 'src/app/Services/Api';
import { PhotosService } from 'src/app/Services/Api/api/photos.service';
import { Members } from 'src/app/Services/Api/model/members';
import { ServiceUrlConnections } from 'src/app/ServiceUrlConnections';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Members
  uploader: FileUploader
  hasBaseDropzoneOver = false
  user: any
  basePath = ServiceUrlConnections.serviceUrl;

  constructor(private _photoService: PhotosService, private _userservice: UsersService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.user = user

    this.initializeUploader()
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      //url: this.basePath + '/api/Photos/UploadphotosAsync',
      url: `${this.basePath}/api/Photos/UploadphotosAsync?id=${this.member.id}`,
      authToken: 'Bearer ' + this.user.token,
      parametersBeforeFiles: true,
      additionalParameter: [this.member.id],
      isHTML5: true,
      allowedFileType: ['image'],
    //  allowedFileType: ['csv', 'xls', 'xlsx'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile= (file) => {
      file.withCredentials = false
      
    }

    this.uploader.onSuccessItem = (item, response, status, headers)=>{
      if(response){
        // const photo = JSON.parse(response);
        // this.member.photo.push(photo);
        // console.log("member=>",this.member)
        this.loadMember(this.member.id)
      }
    }
  }

  loadMember(id: number){
    this._userservice.apiUsersGetUserByIdGet(id).subscribe(res=>{
      this.member = res
    })
  }
}
