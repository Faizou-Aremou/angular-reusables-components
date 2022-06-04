import { FormArray } from "@angular/forms";

export interface UploadFilesParams {
    filesFormArray:FormArray;
    multiple?:boolean;
    maxSizeByFile?:number;
    allowedExtentions:string[];
}