import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { DragDropComponent } from "./core/drag-drop/drag-drop.component";
import { GeneralInfosComponent } from "./core/general-infos/components/general-infos/general-infos.component";

const routes: Routes = [
  {
    path: "",
    component: GeneralInfosComponent,
  },
  {
    path: "drag-drop",
    component: DragDropComponent,
  },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
