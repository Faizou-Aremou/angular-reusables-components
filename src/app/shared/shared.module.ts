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
import { ButtonComponent } from './components/button/button.component';
import { InPipe } from './pipes/in/in.pipe';
import { FileService } from "./services/file/file.service";
import { FileInterface } from "./interfaces/file.interface";
import { AccordionTableComponent } from "./components/accordion-table/accordion-table.component";
import { TableColumnHeaderPipe } from "./pipes/table-column-header/table-column-header.pipe";
import { OverrideTableColumnHeaderDirective } from "./directives/override-table-column-header/override-table-column-header.directive";

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
    ButtonComponent,
    InPipe,
    AccordionTableComponent,
    TableColumnHeaderPipe,
    OverrideTableColumnHeaderDirective

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
    ButtonComponent,
    InPipe,
    AccordionTableComponent,
    TableColumnHeaderPipe,
    OverrideTableColumnHeaderDirective
  ],
  providers: [{ provide: FileInterface, useClass: FileService }]
})
export class SharedModule { }
