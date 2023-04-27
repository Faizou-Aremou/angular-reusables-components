import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { uniqBy } from 'ramda';
import { ALLOWED_EXTENSIONS } from '../../consts/files/allowed-extensions';
import { LabelFileInputTriggerDirective } from '../../directives/label-file-input-trigger/label-file-input-trigger.directive';
import { FileInterface } from '../../interfaces/file.interface';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = false;
  @Input() maxSizeByFile?: number;
  @Input() allowedExtensions: string[] = ALLOWED_EXTENSIONS;

  @Output() uploadedFiles = new EventEmitter<File[]>();

  @ContentChild(LabelFileInputTriggerDirective)
  labelFileInputTrigger?: LabelFileInputTriggerDirective;
  files: File[] = [];
  onChange = (files: File[]) => { };
  onTouched = (files: File[]) => { };
  isDisabled: boolean = false;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    private fileService: FileInterface
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const control = this.controlDir?.control;
    let validators = control?.validator;
    if (validators !== undefined) {
      control?.setValidators(validators);
    }
    control?.updateValueAndValidity();
  }
  writeValue(files: File[]): void {
    this.files = [...new Set(files)];
  }
  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (files: File[]) => void): void {
    this.onTouched = fn;
  }
  selectFiles(event: Event) {
    this.files = uniqBy(
      (file) => file.name,
      [
        ...this.files,
        ...this.fileService.selectFiles(this.fileService.retrieveFilesFromInputEvent, event, this.maxSizeByFile),
      ]
    )
    if (this.files.length > 0) {
      this.uploadedFiles.emit(this.files);
      this.onChange(this.files);
    }
  }

  downloadFile(index: number): void {
    //TODO: use case for function composition
    this.fileService.downloadFileFromObjectUrl(
      this.fileService.convertFileToObjectUrl(this.files[index]),
      this.files[index].name
    );
  }

  removeFile(index: number): void {
    this.files = this.files.filter((file, currentIndex) => currentIndex !== index);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  dropFileHandler(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.files = this.fileService.selectFiles(this.fileService.retrieveFilesFromDragEvent, event);

  }

  dragOverHandler(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  dragLeaveHandler(event: DragEvent): void { }
}
