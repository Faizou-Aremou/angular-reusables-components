import { FormArray } from "@angular/forms";

export interface FilesReaderParams {
    filesFormArray:FormArray;
    multiple:boolean;
    maxSizeByFile?:number;
    allowedExtensions:string[];
}