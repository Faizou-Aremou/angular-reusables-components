import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { TabGroup } from "src/app/shared/types/tab-group/tab-group";
import { filesSizeValidator } from "src/app/shared/validators/files-size.validator";
import { Company } from "../../../models/general-infos/company.model";
import { Role } from "../../../models/general-infos/role.model";
import { UploadFilesService } from "../../../services/upload-files.service";

@Component({
  selector: "app-general-infos",
  templateUrl: "./general-infos.component.html",
  styleUrls: ["./general-infos.component.scss"],
})
export class GeneralInfosComponent implements OnInit {
  tabGroup = new TabGroup<Company | Role>([
    {
      label: "Companies list",
    },
    {
      label: "Roles list",
    },
  ]);
  companiesList$: Observable<any> | null = null;
  rolesList$: Observable<any> | null = null;
  files: File[] = [];
  fileForm!: FormGroup;

  //TODO build array form in accord on file Model

  constructor(
    public readonly uploadFilesService: UploadFilesService,
    public readonly formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.fileForm=this.buildUploadFileForm();
  }

  public buildUploadFileForm(): FormGroup {
    return this.formBuilder.group({
      files: [
        [],filesSizeValidator(6)]
    });
  }
  displayCompanyInfosInTabs(company: Company): void {
    this.tabGroup.addTabDynamically({
      label: `Informations ${company.name}`,
      contentInfos: company,
    });
  }

  displayEditRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Edition Informations ${role.name}`,
      contentInfos: role,
    });
  }

  displayConfigureRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Configure Informations ${role.name}`,
      contentInfos: role,
    });
  }

  displayNoticeRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Notice Informations ${role.name}`,
      contentInfos: role,
    });
  }

  cacheUploadedFile(files: File[]) {
    this.files =  [...files]
    console.log("uploaded files",files);
  }
  uploadFiles(): void {
    if (this.fileForm.valid) {
      this.uploadFilesService.uploadFiles(this.fileForm.value);
    }
  }
}
