import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FILES_MAX_SIZE } from "../cons/files/files-max-size.const";
import { calculateSizeFor } from "../apis/general.api";

export function filesSizeValidator(size: number = FILES_MAX_SIZE): ValidatorFn {
    const maxAllowedSize = size * 1024*1024
    return (filesControl: AbstractControl): ValidationErrors | null => {
      const hasInvalidFileSizeError =
       (filesControl as FormArray).value.length > 0 &&
       calculateSizeFor(filesControl.value) > maxAllowedSize;
      return hasInvalidFileSizeError ? { invalidFileSize: true } : null;
    };
  }