import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { StaticTabsContentDirective } from './directives/static-tabs-contents.directive';
import { AngularMaterialModule } from 'src/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [   
     TableComponent,
     TabGroupComponent, 
     StaticTabsContentDirective, NavBarComponent 
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
