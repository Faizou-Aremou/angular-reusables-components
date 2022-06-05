import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilesReaderParams } from '../../models/file/files-reader-params';
import { FileService } from '../file/file-service.service';


@Injectable()// each user of this service needs to provide his instance
export class FilesReaderService extends FileService { 
  public filesReaderParams:FilesReaderParams | undefined;
  public filesUploaded= false;

  constructor(private changeDetector: ChangeDetectorRef, formBuilder:FormBuilder) {
    super(formBuilder) 
  }

  public init(filesReaderParams:FilesReaderParams){
   this.filesReaderParams = {...filesReaderParams}
  }

  public addFiles(fileEvent: any): void { //TODO:use Event type here
    const fileInput = fileEvent.target;
    if (fileInput.files?.length > 0) {
      const files = fileInput.files;
      this.readFilesInFileFormArray(files);
      this.filesUploaded = true;
      
    }
  }

  public readFilesInFileFormArray(files: FileList): void {
    this.filesReaderParams?.multiple
      ? this.readMultipleFileInFileFormArray(files)
      : this.readUniqueFileInFileFormArray(files);
  }

  public readMultipleFileInFileFormArray(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.filesReaderParams?.filesFormArray.push(
          this.buildFileFormGroup(
            file.name,
            reader.result as string,
            this.filesReaderParams?.maxSizeByFile
          )
        );
        this.changeDetector.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  public readUniqueFileInFileFormArray(files: FileList): void {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.filesReaderParams?.filesFormArray.insert(
        0,
        this.buildFileFormGroup(
          file.name,
          reader.result as string,
          this.filesReaderParams?.maxSizeByFile
        )
      );
      this.changeDetector.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  
  public removeFile(index: number):void {
    this.filesReaderParams?.filesFormArray.removeAt(index);
  }

  public downloadFile( index:number):void{
    const fileForm = this.filesReaderParams?.filesFormArray.at(index) as FormGroup;
    this.downloadPDF(fileForm.value);
  }
}
