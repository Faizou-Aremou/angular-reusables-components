import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralInfosRoutingModule } from "./general-infos-routing.module";
import { GeneralInfosComponent } from "./components/general-infos/general-infos.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CompaniesComponent } from "./components/companies/companies.component";
import { RolesComponent } from "./components/roles/roles.component";
import { AngularMaterialModule } from "src/material.module";
import { InformationsComponent } from "./components/informations/informations.component";

@NgModule({
  declarations: [
    GeneralInfosComponent,
    CompaniesComponent,
    RolesComponent,
    InformationsComponent,
  ],
  imports: [
    CommonModule,
    GeneralInfosRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
  exports: [GeneralInfosComponent],
})
export class GeneralInfosModule {}
