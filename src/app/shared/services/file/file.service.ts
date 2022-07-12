import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FILE_MAX_SIZE } from "../../cons/files/file-max-size.const";
import { FileInterface } from "../../interfaces/file.interface";
import { FileSize } from "../../models/file/file-size.model";
import { FileUnit } from "../../models/file/file-unit";

@Injectable({
  providedIn: "root",
})
export class FileService implements FileInterface {

  constructor(private http: HttpClient) {}

  selectFiles(event: Event, maxSizeByFile:number=FILE_MAX_SIZE): File[] {//maxSizeByFile in MB
    const fileList = (event.target as HTMLInputElement).files as FileList;
    let fileSequence: File[] = [];
    for (let index = 0; index < fileList.length; index++) {
      fileSequence = this.filterInvalidFileSize(fileList, index, maxSizeByFile, fileSequence);
    }
    return fileSequence;
  }



  filesSizeInByte(files: File[]): number {
    return files.reduce((sizeInByte, file) => {
      return sizeInByte + file.size;
    }, 0);
  }

  convertFileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  convertFileToObjectUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  freeObjectUrlInMemory(url: string): void {
    URL.revokeObjectURL(url);
  }

  reduceOctetToAppropriateUnit(size: number): FileSize {
    let reductionNumber = size;
    let index = 0;
    while (reductionNumber > 1 && index < Object.values(FileUnit).length) {
      reductionNumber = size / 1024;
      index++;
    }
    return {
      size: reductionNumber.toFixed(3),
      unit: Object.values(FileUnit)[index],
    };
  }

  recursionReduceOctetToAppropriateUnit(
    size: number,
    fileUnitList: FileUnit[]
  ): FileSize {
    const [element, ...rest] = fileUnitList;
    if (size === 0 && fileUnitList.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size === 0 && fileUnitList.length > 0) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size > 0 && fileUnitList.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else {
      if (size > 1) {
        return this.recursionReduceOctetToAppropriateUnit(size / 1024, rest);
      } else {
        return {
          size: size.toFixed(3),
          unit: element,
        };
      }
    }
  }

  downloadFileFromObjectUrl(url: string, fileName: string): void {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    this.freeObjectUrlInMemory(url);
  }

  downloadFileFromDataUrl(dataUrl: string, fileName: string): void {
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  uploadDataWithTrackingProgress<T>(
    fileData:T,
    url: string
  ): Observable<any> {
    const req = new HttpRequest("POST", url, fileData, {
      reportProgress: true,
    });

    return this.http
      .request(req)
      .pipe(map((event) => this.getEventPercent(event)));
  }

  private getEventPercent(event: HttpEvent<any>): number {
    switch (event.type) {
      case HttpEventType.Sent:
        return 0;
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 0;
        return percentDone;

      case HttpEventType.Response:
        return 100;

      default:
        return 0;
    }
  }

  private filterInvalidFileSize(fileList: FileList, index: number, maxSizeByFile: number, fileSequence: File[]) {
    if (fileList[index].size <= maxSizeByFile * 1024 * 1024) {
      fileSequence = [...fileSequence, fileList[index]];
    }
    return fileSequence;
  }

}
