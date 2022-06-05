import { Component, Input, OnInit } from '@angular/core';
import { FilesReaderParams } from '../../models/file/files-reader-params';
import { FilesReaderService } from '../../services/files-reader/files-reader.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers:[FilesReaderService]
})
export class UploadFilesComponent implements OnInit {
  @Input() filesReaderParams: FilesReaderParams | undefined;
   constructor(public filesReaderService:FilesReaderService) {
   }

  ngOnInit(): void {
    if(this.filesReaderParams) {
      this.filesReaderService.init(this.filesReaderParams);
    } 
  }

}
