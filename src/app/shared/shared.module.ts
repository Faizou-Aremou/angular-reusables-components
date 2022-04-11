import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { StaticTabsContentDirective } from './directives/static-tabs-contents.directive';
import { AngularMaterialModule } from 'src/material.module';



@NgModule({
  declarations: [   
     TableComponent,
     TabGroupComponent, 
     StaticTabsContentDirective 
    ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    TableComponent,
    TabGroupComponent, 
    StaticTabsContentDirective
  ],
})
export class SharedModule { }
