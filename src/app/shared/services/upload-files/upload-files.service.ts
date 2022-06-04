import { Injectable } from '@angular/core';
import { UploadFilesParams } from '../../models/upload-files/upload-files-params';
import { FileService } from '../file/file-service.service';

@Injectable()
export class UploadFilesService {
  public uploadFilesParams:UploadFilesParams | undefined;
  public filesUploaded= false;

  constructor(private fileService:FileService) { }

  public init(uploadFilesParams:UploadFilesParams){
    this.uploadFilesParams = {...uploadFilesParams}
  }

  public addFiles(fileEvent: any): void { //TODO:use Event type here
    const fileInput = fileEvent.target;
    if (fileInput.files?.length > 0) {
      const files = fileInput.files;
      this.readFileListAndAddToFileFormArray(files);
      this.filesUploaded = true;
    }
  }

  public readFileListAndAddToFileFormArray(files: FileList): void {
    this.uploadFilesParams?.multiple
      ? this.readMultipleFileAndAddToFileFormArray(files)
      : this.readUniqueFileAndAddToFileFormArray(files);
  }

  public readMultipleFileAndAddToFileFormArray(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      // inspired from https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_showing_thumbnails_of_user-selected_images

      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadFilesParams?.filesFormArray.push(
          this.fileService.buildFileFormGroup(
            file.name,
            reader.result as string,
            this.uploadFilesParams?.maxSizeByFile
          )
        );
      };
      reader.readAsDataURL(file);
    }
  }

  public readUniqueFileAndAddToFileFormArray(files: FileList): void {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.uploadFilesParams?.filesFormArray.insert(
        0,
        this.fileService.buildFileFormGroup(
          file.name,
          reader.result as string,
          this.uploadFilesParams?.maxSizeByFile
        )
      );
    };
    reader.readAsDataURL(file);
  }

  public removeFile(index: number) {
    this.uploadFilesParams?.filesFormArray.removeAt(index);
  }


}
