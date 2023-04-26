import { Observable } from 'rxjs';
import { FileSize } from '../models/file/file-size.model';
import { FileUnit } from '../models/file/file-unit';
import { RetrieveFileFromEventFn } from '../models/file/retrieve-file-from-event';

export abstract class FileInterface {
  abstract selectFiles<T>(maxSizeByFile: number|undefined, retrieveFileFromEventFn: RetrieveFileFromEventFn<T>, event: T): File[];

  abstract filesSizeInByte(files: File[]): number;

  abstract convertFileToDataUrl(file: File): Promise<string>;

  abstract convertFileToObjectUrl(file: File): string;

  abstract freeObjectUrlInMemory(url: string): void;

  abstract reduceOctetToAppropriateUnit(size: number): FileSize;

  abstract recursionReduceOctetToAppropriateUnit(
    size: number,
    fileUnitList: FileUnit[]
  ): FileSize;

  abstract downloadFileFromObjectUrl(url: string, fileName: string): void;

  abstract downloadFileFromDataUrl(dataUrl: string, fileName: string): void;

  abstract uploadDataWithTrackingProgress<T>(
    fileData: T,
    url: string
  ): Observable<any>;

  abstract retrieveFilesFromInputEvent(event: Event): FileList | undefined;
  abstract retrieveFilesFromDragEvent(event: DragEvent): FileList | undefined

}
