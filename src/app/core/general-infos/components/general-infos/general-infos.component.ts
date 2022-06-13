import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { CFile } from "src/app/shared/models/file/c-file.model";
import { TabGroup } from "src/app/shared/types/tab-group/tab-group";
import { fileUnicityValidator } from "src/app/shared/validators/file-unicity.validator";
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
  cFiles: CFile[] = [];

  //TODO build array form in accord on file Model

  constructor(
    public uploadFilesService: UploadFilesService
  ) {}

  ngOnInit(): void {}

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

  cacheUploadedFile(cFiles: CFile[]) {
    this.cFiles =  [...cFiles]
    console.log("uploaded files",cFiles);
  }
  uploadFiles(): void {
    if (this.cFiles.length > 0) {
      this.uploadFilesService.uploadFiles(this.cFiles);
    }
  }
}
