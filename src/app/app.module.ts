import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TableComponent } from './shared/table/table.component';
import { CompaniesComponent } from './core/companies/companies.component';
import { RolesComponent } from './core/roles/roles.component';
import { RolesPaneComponent } from './core/roles-pane/roles-pane.component';
import { CompaniesPaneComponent } from './core/companies-pane/companies-pane.component';
import { TabGroupComponent } from './shared/tab-group/tab-group.component';
import { StaticTabsContentDirective } from './shared/directives/static-tabs-contents.directive';

@NgModule({
  declarations: [AppComponent, TableComponent, CompaniesComponent, RolesComponent, RolesPaneComponent, CompaniesPaneComponent, TabGroupComponent, StaticTabsContentDirective],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
