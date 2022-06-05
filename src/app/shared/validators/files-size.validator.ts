import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";
import { calculateFilesSize } from "../helpers/file";

export function filesSizeValidator(size: number = 10): ValidatorFn {
    const maxAllowedSize = size * 1024*1024
    return (filesFormArray: AbstractControl): ValidationErrors | null => {
      const hasInvalidFileSizeError =
       (filesFormArray as FormArray).length===0 &&
       calculateFilesSize((filesFormArray as FormArray ).controls) > maxAllowedSize;
      return hasInvalidFileSizeError ? { invalidFileSize: true } : null;
    };
  }