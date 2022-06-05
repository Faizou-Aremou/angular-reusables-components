import { AbstractControl } from "@angular/forms";

export function calculateFileSize(fileContentBase64: string): number {
  if (fileContentBase64 === "") {
    return 0;
  }
  const fileContentBase64Groups = fileContentBase64.split(";base64,");
  return (
    fileContentBase64Groups[fileContentBase64Groups.length - 1].length * 0.75 -
    (fileContentBase64.endsWith("==") ? 2 : 1)
  );
}

export function calculateFilesSize(filesFormGroup: AbstractControl[]): number {
  const initialFileSize = 0;
  return filesFormGroup.reduce((fileSize, fileFormGroup) => {
    return (
      fileSize +
      calculateFileSize(fileFormGroup.get("fileContentBase64")?.value)
    );
  }, initialFileSize);
}
