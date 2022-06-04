import { Component, Input, OnInit } from '@angular/core';
import { UploadFilesParams } from '../../models/upload-files/upload-files-params';
import { FilesReaderService } from '../../services/files-reader/files-reader.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers:[FilesReaderService]
})
export class UploadFilesComponent implements OnInit {
  @Input() uploadFilesParams: UploadFilesParams | undefined;
   constructor(public filesReaderService:FilesReaderService) {
   }

  ngOnInit(): void {
    if(this.uploadFilesParams) {
      this.filesReaderService.init(this.uploadFilesParams);
    } 
  }

  downloadFile(){

  }

}
