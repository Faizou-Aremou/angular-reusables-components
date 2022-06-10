import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FileSize } from "../../models/file/file-size.model";
import { FileUnit } from "../../models/file/file-unit";


@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private http: HttpClient) {}

  selectFile(event: Event): File[] {
    const fileList = (event.target as HTMLInputElement).files as FileList;
    let fileArray:File[] = [];
    for (let index = 0; index < fileList.length; index++) {
      fileArray = [...fileArray, fileList[index]];
    }
    return fileArray;
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

  convertOctetToAppropriateUnit(size: number): FileSize {
    let reductionNumber = size;
    let index = 0;
    while (reductionNumber > 1 && index < Object.values(FileUnit).length) {
      reductionNumber = size / 1024;
      index++;
    }
    return {
      size: reductionNumber.toFixed(3),
      unit: Object.values(FileUnit)[index]
    };
  }

  recursionConvertOctetToAppropriateUnit(
    size: number,
    fileUnit: FileUnit[]
  ): FileSize {
    const [element, ...rest] = fileUnit;
    if (size === 0 && fileUnit.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size === 0 && fileUnit.length > 0) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size > 0 && fileUnit.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else {
      if (size > 1) {
        return this.recursionConvertOctetToAppropriateUnit(size / 1024, rest);
      } else {
        return {
          size: size.toFixed(3),
          unit: element,
        };
      }
    }
  }

  downloadFileFromObjectUrl(url: string, fileName: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    this.freeObjectUrlInMemory(url);
  }

  downloadFileFromDataUrl(dataUrl: string, fileName: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  uploadFilesWithTrackingProgress(
    fileData: File | File[],
    url: string
  ): Observable<any> {
    const req = new HttpRequest('POST', url, fileData, {
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

}
