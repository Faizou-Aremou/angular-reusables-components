import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { FilesReaderParams } from "src/app/shared/models/file/files-reader-params";
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
  public tabGroup = new TabGroup<Company | Role>([
    {
      label: "Companies list",
    },
    {
      label: "Roles list",
    },
  ]);
  public companiesList$: Observable<any> | null = null;
  public rolesList$: Observable<any> | null = null;

   //TODO build array form in accord on file Model
  public uploadFilesForm: FormGroup = this.formBuilder.group({
    files: this.formBuilder.array([],[filesSizeValidator(), fileUnicityValidator ])
  });

  public filesReaderParams: FilesReaderParams = {
    filesFormArray: this.uploadFilesForm.get('files') as FormArray,
    multiple: true,
    allowedExtensions: ["pdf"],
  };

  constructor(
    private formBuilder: FormBuilder,
    public uploadFilesService: UploadFilesService
  ) {}

  ngOnInit(): void {}

  public displayCompanyInfosInTabs(company: Company): void {
    this.tabGroup.addTabDynamically({
      label: `Informations ${company.name}`,
      contentInfos: company,
    });
  }

  public displayEditRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Edition Informations ${role.name}`,
      contentInfos: role,
    });
  }

  public displayConfigureRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Configure Informations ${role.name}`,
      contentInfos: role,
    });
  }

  public displayNoticeRolesInTab(role: Role): void {
    this.tabGroup.addTabDynamically({
      label: `Notice Informations ${role.name}`,
      contentInfos: role,
    });
  }

  public uploadFiles(): void {
    if (this.uploadFilesForm.valid) {
      this.uploadFilesService.uploadFiles(this.uploadFilesForm.value.files);
    }
  }
}
