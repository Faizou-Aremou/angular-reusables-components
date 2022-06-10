import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export const fileUnicityValidator: ValidatorFn = (filesFormArray: AbstractControl) => {
    const hasDuplicity = (filesFormArray as FormArray).controls.some(
      (fileFormGroup, index, array) =>
        array.filter(
          (element) =>
            element.get('name')?.value ===
            fileFormGroup.get('name')?.value
        ).length > 1
    );
  
    return hasDuplicity ? { duplicityError: true } : null;
  };