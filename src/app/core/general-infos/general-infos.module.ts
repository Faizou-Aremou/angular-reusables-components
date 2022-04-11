import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfosRoutingModule } from './general-infos-routing.module';
import { GeneralInfosComponent } from './general-infos/general-infos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { RolesComponent } from './roles/roles.component';
import { RolesPaneComponent } from '../roles-pane/roles-pane.component';
import { CompaniesPaneComponent } from './companies-pane/companies-pane.component';
import { AngularMaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    GeneralInfosComponent,
    CompaniesComponent,
     RolesComponent, 
     RolesPaneComponent, 
     CompaniesPaneComponent, 
  ],
  imports: [
    CommonModule,
    GeneralInfosRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports:[
    GeneralInfosComponent
  ]
})
export class GeneralInfosModule { }
