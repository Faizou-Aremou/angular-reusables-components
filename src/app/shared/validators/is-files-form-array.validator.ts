import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export const isFileFormArrayValidator: ValidatorFn = (
  formArray: AbstractControl
): ValidationErrors | null => {
  const isNotFileFormArray = (formArray as FormArray).controls.some(
    (abstractControl) =>
      !(abstractControl instanceof FormGroup) ||
      abstractControl.get("fileName") === null ||
      abstractControl.get("fileContentBase64") === null
  );
  return isNotFileFormArray ? { invalidFileFormArray: true } : null;
};
