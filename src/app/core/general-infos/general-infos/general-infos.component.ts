import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabGroup } from 'src/app/shared/models/tab-group/tab-group.model';
import { Company } from '../companies/models/company.model';
import { Role } from '../roles/models/role.model';

@Component({
  selector: 'app-general-infos',
  templateUrl: './general-infos.component.html',
  styleUrls: ['./general-infos.component.scss']
})
export class GeneralInfosComponent implements OnInit {

  public tabGroup = new TabGroup<Company>(
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

 public displayCompanyInfosInTabs(company:Company):void{
  this.tabGroup.addTabDynamically(
    {
    label:"Informations",
    contentInfos:company
    }
)
 }

 public displayEditRolesInTab(role:Role):void{
  this.tabGroup.addTabDynamically(
    {
    label:"Edition Informations",
    contentInfos:role
    }
)
 }


 public displayConfigureRolesInTab(role:Role):void{
  this.tabGroup.addTabDynamically(
    {
    label:"Configure Informations",
    contentInfos:role
    }
)
 }


 public displayNoticeRolesInTab(role:Role):void{
  this.tabGroup.addTabDynamically(
    {
    label:"Notice Informations",
    contentInfos:role
    }
)
 }


}
