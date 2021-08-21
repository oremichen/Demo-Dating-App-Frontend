import { Component, Input, OnInit } from '@angular/core';
import { Members } from 'src/app/Services/Api/model/members';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Members

  constructor() { }

  ngOnInit(): void {
  }

}
