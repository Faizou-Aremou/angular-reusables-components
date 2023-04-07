import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FILE_MAX_SIZE } from "../../cons/files/file-max-size.const";
import { FileInterface } from "../../interfaces/file.interface";
import { Download } from "../../models/file/dowload";
import { FileSize } from "../../models/file/file-size.model";
import { FileUnit } from "../../models/file/file-unit";

@Injectable({
  providedIn: "root",
})
export class FileService implements FileInterface {

  constructor(private http: HttpClient) { }

  response: any; // TODO: delete this attribute;

  selectFiles(event: Event, maxSizeByFile: number = FILE_MAX_SIZE): File[] {//maxSizeByFile in MB
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

  getFileWithTrakingProcessInHttpNative<T>(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = (event: ProgressEvent<EventTarget>) => {
      this.response = request.response;
    }
    request.onerror = function (e) {
      console.log("error downloading file");
    }
  } // TODO: improve this function to return observable

  getFileWithTrakingProcess<Blob>(url: string) {
    return this.http.get(url, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(map((event) => this.transfertDownloadData(event)))
  }

  uploadDataWithTrackingProgress<T>(
    fileData: T,
    url: string
  ): Observable<any> {
    const req = new HttpRequest<T>("POST", url, fileData, {
      reportProgress: true,
    });
    return this.http
      .request<any>(req)
      .pipe(map((event) => this.getUploadEventPercent(event)));
  }

  private transfertDownloadData<T>(event: HttpEvent<T>): Download<T> {
    if (this.isHttpDownloadProgressEvent(event)) {
      return {
        progress: this.getDowloadEventPercent(event),
        state: 'IN_PROGRESS',
        content: null
      }
    } else if (this.isHttpResponse(event)) {
      return {
        progress: 100,
        state: 'DONE',
        content: event.body
      }
    }
    throw new Error("Get File Error")
  }

  private getUploadEventPercent(event: HttpEvent<any>): number {
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

  private getDowloadEventPercent(event: HttpEvent<any>): number {
    switch (event.type) {
      case HttpEventType.Sent:
        return 0;
      case HttpEventType.DownloadProgress:
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

  private isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response
  }

  private isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return event.type === HttpEventType.DownloadProgress
      || event.type === HttpEventType.UploadProgress
  }
  private isHttpUploadProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return event.type === HttpEventType.DownloadProgress
      || event.type === HttpEventType.UploadProgress
  }
  private isHttpDownloadProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return event.type === HttpEventType.DownloadProgress;
  }

}
