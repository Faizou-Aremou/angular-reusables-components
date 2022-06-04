import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UploadFilesService {
  constructor() {}

  public uploadFiles(files: File[]):void {
    console.log("files upload", files);
  }
}
