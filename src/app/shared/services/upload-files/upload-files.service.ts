import {Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilesReaderParams } from '../../models/file/files-reader-params';
import { fileSizeValidator } from '../../validators/file-size.validator';


@Injectable({
  providedIn:'root'
})
export class UploadFilesService  { 
  public filesReaderParams:FilesReaderParams | undefined;
  public filesUploaded= false;

  constructor(private formBuilder:FormBuilder) {
  }

  public buildFileFormGroup(
    name: string,
    contentBase64: string,
    maxSizeByFile: number | undefined = 3,
    file:File
  ): FormGroup {
    return this.formBuilder.group(
      {
        name: [name],
        contentBase64: [contentBase64],
        file:[file]
      },
      {
        validators: fileSizeValidator(
          maxSizeByFile
        ),
      } as AbstractControlOptions
    );
  }

}
