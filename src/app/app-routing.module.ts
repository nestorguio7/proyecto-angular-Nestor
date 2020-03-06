import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NuevoComponent } from "./nuevo/nuevo.component";

const routes: Routes = [{ path: "nuevo", component: NuevoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
