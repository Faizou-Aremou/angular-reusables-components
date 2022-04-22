import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { StaticTabsContentDirective } from './directives/tab-group/static-tabs-contents.directive';
import { AngularMaterialModule } from 'src/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TableColumnDirective } from './directives/table/table-column.directive';
import { TableColumnRefPipe } from './pipes/table/table-column-ref.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [   
     TableComponent,
     TabGroupComponent, 
     StaticTabsContentDirective, NavBarComponent, TableColumnDirective, TableColumnRefPipe 
    ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    ReactiveFormsModule,
    TableComponent,
    TabGroupComponent,
    NavBarComponent, 
    StaticTabsContentDirective,
    TableColumnDirective, TableColumnRefPipe 
  ],
})
// TODO: put all exported data in array
export class SharedModule { }
