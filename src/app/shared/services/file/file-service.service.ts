import { Injectable } from "@angular/core";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CFile } from "../../models/file/cfile.model";
import { fileSizeValidator } from "../../validators/file-size.validator";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private formBuilder: FormBuilder) {}

  public downloadPDF(file:CFile) {
    const linkSource = file.fileContentBase64;
    const downloadLink = document.createElement("a");
    const fileName = file.fileName;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

  public buildFileFormGroup(
    name: string,
    fileContentBase64: string,
    maxSizeByFile: number | undefined = 3
  ): FormGroup {
    return this.formBuilder.group(
      {
        fileName: [name, Validators.required],
        fileContentBase64: [fileContentBase64, Validators.required],
      },
      {
        validators: fileSizeValidator(
          maxSizeByFile
        ),
      } as AbstractControlOptions
    );
  }
}
