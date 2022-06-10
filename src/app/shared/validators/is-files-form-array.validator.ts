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
      abstractControl.get("name") === null ||
      abstractControl.get("contentBase64") === null
  );
  return isNotFileFormArray ? { invalidFileFormArray: true } : null;
};
