import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./components/table/table.component";
import { TabGroupComponent } from "./components/tab-group/tab-group.component";
import { StaticTabsContentDirective } from "./directives/tab-group/static-tabs-contents.directive";
import { AngularMaterialModule } from "src/material.module";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { OverrideTableColumnDirective } from "./directives/override-table-column/override-table-column.directive";
import { TableColumnPipe } from "./pipes/table-column/table-column.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { UploadFilesComponent } from "./components/upload-files/upload-files.component";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { LabelFileInputTriggerDirective } from './directives/label-file-input-trigger/label-file-input-trigger.directive';
import { ActionsButtonDirective } from './directives/actions-button/actions-button.directive';

@NgModule({
  declarations: [
    TableComponent,
    TabGroupComponent,
    StaticTabsContentDirective,
    NavBarComponent,
    OverrideTableColumnDirective,
    TableColumnPipe,
    UploadFilesComponent,
    SafeUrlPipe,
    LabelFileInputTriggerDirective,
    ActionsButtonDirective,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    TableComponent,
    TabGroupComponent,
    StaticTabsContentDirective,
    NavBarComponent,
    OverrideTableColumnDirective,
    TableColumnPipe,
    UploadFilesComponent,
    LabelFileInputTriggerDirective,
    ActionsButtonDirective
  ],
})
export class SharedModule {}
