import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/Api';
import { AuthenticationService } from 'src/app/Services/Api/api/authentication.service';
import { PhotosService } from 'src/app/Services/Api/api/photos.service';
import { Members } from 'src/app/Services/Api/model/members';
import { PhotoDto } from 'src/app/Services/Api/model/photoDto';
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
  photoId: number
  photourl: string

  constructor(private _photoService: PhotosService, private _userservice: UsersService, 
    private _authService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.user = user

    this.initializeUploader()
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  setmainPhoto(photo: PhotoDto){
    this._photoService.apiPhotosSetMainPhotoPut(photo.id, this.member.id).subscribe(res=>{
      this.user.url = photo.url
      this._authService.setCurrentUsers(this.user)
      this.member.photoUrl = photo.url
      this.member.photo.forEach(r=> {
        if(r.isMain) r.isMain = false
        if(r.id === photo.id) r.isMain = true
      })

    })
  }

  deletePhoto(photo: PhotoDto){
    this._photoService.apiPhotosDeletePhotoDelete(photo.id).subscribe(res=>{
      this.member.photo = this.member.photo.filter(x=> x.id!== photo.id)
    },error=>{
      console.log(error)
      this.toastr.error(error.error)
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
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
        const photo: PhotoDto = JSON.parse(response);
        this.member.photo.push(photo);
       if(photo.isMain){
        this.user.url = photo.url
        this.member.photoUrl = photo.url
        this._authService.setCurrentUsers(this.user)
       }
      }
    }
  }
}
