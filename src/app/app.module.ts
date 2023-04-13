import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GeneralInfosModule } from './core/general-infos/general-infos.module';
import { SharedModule } from './shared/shared.module';
import { DragDropComponent } from './core/drag-drop/drag-drop.component';
import { BasicDragDropComponent } from './core/basic-drag-drop/basic-drag-drop.component';
import { ImageDragDropComponent } from './core/image-drag-drop/image-drag-drop.component';
import { TextDragDropComponent } from './core/text-drag-drop/text-drag-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    BasicDragDropComponent,
    ImageDragDropComponent,
    TextDragDropComponent
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
