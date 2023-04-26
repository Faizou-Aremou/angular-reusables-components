import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneralInfosRoutingModule } from "./general-infos-routing.module";
import { GeneralInfosComponent } from "./components/general-infos/general-infos.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CompaniesComponent } from "./components/companies/companies.component";
import { RolesComponent } from "./components/roles/roles.component";
import { AngularMaterialModule } from "src/material.module";
import { InformationsComponent } from "./components/informations/informations.component";
import { DragDropComponent } from "./components/drag-drop/drag-drop.component";
import { BasicDragDropComponent } from "./components/basic-drag-drop/basic-drag-drop.component";
import { ImageDragDropComponent } from "./components/image-drag-drop/image-drag-drop.component";
import { TextDragDropComponent } from "../text-drag-drop/text-drag-drop.component";

@NgModule({
  declarations: [
    GeneralInfosComponent,
    CompaniesComponent,
    RolesComponent,
    InformationsComponent,
    DragDropComponent,
    BasicDragDropComponent,
    ImageDragDropComponent,
    TextDragDropComponent,
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
