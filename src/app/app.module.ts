import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompaniesComponent } from './core/general-infos/companies/companies.component';
import { RolesComponent } from './core/general-infos/roles/roles.component';
import { RolesPaneComponent } from './core/roles-pane/roles-pane.component';
import { CompaniesPaneComponent } from './core/general-infos/companies-pane/companies-pane.component';
import { GeneralInfosModule } from './core/general-infos/general-infos.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent, 
    
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GeneralInfosModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
