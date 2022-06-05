import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./components/table/table.component";
import { TabGroupComponent } from "./components/tab-group/tab-group.component";
import { StaticTabsContentDirective } from "./directives/tab-group/static-tabs-contents.directive";
import { AngularMaterialModule } from "src/material.module";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { TableColumnDirective } from "./directives/table/table-column.directive";
import { TableColumnRefPipe } from "./pipes/table/table-column-ref.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { UploadFilesComponent } from "./components/upload-files/upload-files.component";

@NgModule({
  declarations: [
    TableComponent,
    TabGroupComponent,
    StaticTabsContentDirective,
    NavBarComponent,
    TableColumnDirective,
    TableColumnRefPipe,
    UploadFilesComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    TableComponent,
    TabGroupComponent,
    StaticTabsContentDirective,
    NavBarComponent,
    TableColumnDirective,
    TableColumnRefPipe,
    UploadFilesComponent,
  ],
})
export class SharedModule {}
