import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NuevoComponent } from "./nuevo/nuevo.component";
import { ListadoComponent } from "./listado/listado.component";

const routes: Routes = [
  { path: "", component: ListadoComponent },
  { path: "nuevo", component: NuevoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
