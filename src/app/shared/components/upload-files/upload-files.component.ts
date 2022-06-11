import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FilesReaderParams } from "../../models/file/files-reader-params";
import { FileService } from "../../services/file/file.service";
import { UploadFilesService } from "../../services/upload-files/upload-files.service";


@Component({
  selector: "app-upload-files",
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"],
})
export class UploadFilesComponent implements OnInit {
  @Input() filesReaderParams: FilesReaderParams | undefined;
  constructor(
    private uploadFilesService: UploadFilesService,
    private fileService: FileService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  selectFiles(event: Event) {
    this.fileService.selectFile(event).forEach(async (file) => {
      const base64 = await this.fileService.convertFileToDataUrl(file);
      this.changeDetector.markForCheck();
      if (this.filesReaderParams?.multiple) {
        this.filesReaderParams?.filesFormArray.push(
          this.uploadFilesService.buildFileFormGroup(
            file.name,
            base64,
            this.filesReaderParams.maxSizeByFile,
            file
          )
        );
      } else {
        this.filesReaderParams?.filesFormArray.insert(
          0,
          this.uploadFilesService.buildFileFormGroup(
            file.name,
            base64,
            this.filesReaderParams?.maxSizeByFile,
            file
          )
        );
      }
    });
  }
  downloadFile(index: number): void {
    const fileGroup = this.filesReaderParams?.filesFormArray.at(
      index
    ) as FormGroup;
    this.fileService.downloadFileFromObjectUrl(
      this.fileService.convertFileToObjectUrl(fileGroup.value.file),
      fileGroup.value.name
    );
  }

  removeFile(index: number): void {
    this.filesReaderParams?.filesFormArray.removeAt(index);
  }
}
