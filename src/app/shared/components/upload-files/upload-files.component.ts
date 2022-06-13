import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { ALLOWED_EXTENSIONS } from "../../consts/files/allowed-extensions";
import { LabelFileInputTriggerDirective } from "../../directives/label-file-input-trigger/label-file-input-trigger.directive";
import { CFile } from "../../models/file/c-file.model";
import { FileService } from "../../services/file/file.service";

@Component({
  selector: "app-upload-files",
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"],
})
export class UploadFilesComponent implements OnInit {
  @Input() multiple = false;
  @Input() maxSizeByFile?: number;
  @Input() allowedExtensions: string[] = ALLOWED_EXTENSIONS;

  @Output() uploadedFile = new EventEmitter<CFile[]>();

  @ContentChild(LabelFileInputTriggerDirective)
  labelFileInputTrigger?: LabelFileInputTriggerDirective;

  public uploadFilesForm: FormGroup;

  constructor(
    private fileService: FileService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.uploadFilesForm = fileService.buildUploadFileForm();
  }

  ngOnInit(): void {}
  get files() {
    return this.uploadFilesForm.get("files") as FormArray;
  }
  selectFiles(event: Event) {
    this.fileService.selectFile(event).forEach(async (file) => {
      const base64 = await this.fileService.convertFileToDataUrl(file);
      this.changeDetector.markForCheck();
      if (this.multiple) {
        this.files?.push(
          this.fileService.buildFileFormGroup(
            file.name,
            base64,
            this.maxSizeByFile,
            file
          )
        );
      } else {
        this.files?.insert(
          0,
          this.fileService.buildFileFormGroup(
            file.name,
            base64,
            this.maxSizeByFile,
            file
          )
        );
      }
      if (this.uploadFilesForm.valid) {
        this.uploadedFile.emit(this.files.value as CFile[]);
      }
    });
  }
  downloadFile(index: number): void {
    const fileGroup = this.files?.at(index) as FormGroup;
    this.fileService.downloadFileFromObjectUrl(
      this.fileService.convertFileToObjectUrl(fileGroup.value.file),
      fileGroup.value.name
    );
  }

  removeFile(index: number): void {
    this.files?.removeAt(index);
  }
}
