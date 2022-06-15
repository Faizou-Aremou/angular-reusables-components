import { Injectable } from "@angular/core";
import { CFile } from "src/app/shared/models/file/c-file.model";

@Injectable({
  providedIn: "root",
})
export class UploadFilesService {
  constructor() {}

  public uploadFiles(files: File[]):void {
    console.log("files upload", files);
  }
}
