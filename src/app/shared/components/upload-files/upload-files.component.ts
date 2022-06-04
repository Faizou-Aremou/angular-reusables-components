import { Component, Input, OnInit } from '@angular/core';
import { UploadFilesParams } from '../../models/upload-files/upload-files-params';
import { UploadFilesService } from '../../services/upload-files/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers:[UploadFilesService]
})
export class UploadFilesComponent implements OnInit {
  @Input() uploadFilesParams: UploadFilesParams | undefined;
   constructor(public uploadFilesService:UploadFilesService) {
   }

  ngOnInit(): void {
    if(this.uploadFilesParams) {
      this.uploadFilesService.init(this.uploadFilesParams);
    } 
  }

}
