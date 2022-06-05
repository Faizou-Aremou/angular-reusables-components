import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { calculateFileSize } from "../helpers/file";

export function fileSizeValidator(size: number): ValidatorFn {
  const maxAllowedSize = size * 1024 * 1024; // size in Mo

  return (formGroup: AbstractControl): ValidationErrors | null => {
    const fileContentBase64: string = formGroup.get("fileContentBase64")?.value;
    return calculateFileSize(fileContentBase64) > maxAllowedSize
      ? { invalidFileSize: true }
      : null;
  };
}
