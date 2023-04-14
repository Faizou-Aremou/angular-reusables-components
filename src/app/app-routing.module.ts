import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DragDropComponent } from './core/drag-drop/drag-drop.component';
import { DropFilesComponent } from './core/drop-files/drop-files.component';
import { GeneralInfosComponent } from './core/general-infos/components/general-infos/general-infos.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralInfosComponent,
  },
  {
    path: 'drag-drop-element',
    component: DragDropComponent,
  },
  {
    path: 'drag-drop-file',
    component: DropFilesComponent
  },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
