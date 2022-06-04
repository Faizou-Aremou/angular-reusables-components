import { Injectable } from "@angular/core";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private formBuilder: FormBuilder) {}

  public buildFileFormGroup(
    name: string,
    fileContentBase64: string,
    maxSizeByFile: number | undefined = 3
  ): FormGroup {
    return this.formBuilder.group(
      {
        fileName: [name, Validators.required],
        fileContentBase64: [fileContentBase64, Validators.required],
      }
      // ,
      // {
      //   validators: fileSizeValidator(
      //     maxSizeByFile,
      //     'fileContentBase64',
      //     'fileName'
      //   ),
      // } as AbstractControlOptions
    );
  }
}
