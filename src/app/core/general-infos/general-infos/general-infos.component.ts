import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabGroup } from 'src/app/shared/types/tab-group/tab-group';
import { Company } from '../../models/general-infos/company.model';
import { Role } from '../../models/general-infos/role.model';

@Component({
  selector: 'app-general-infos',
  templateUrl: './general-infos.component.html',
  styleUrls: ['./general-infos.component.scss']
})
export class GeneralInfosComponent implements OnInit {

  public tabGroup = new TabGroup<Company| Role>(
    [
      {
        label: "Companies list"
      },
      {
        label: "Roles list"
      }
    ]
  )
  public companiesList$:Observable<any> | null= null;
  public rolesList$:Observable<any> | null= null;
  constructor() { }

  ngOnInit(): void {
  }

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


}
