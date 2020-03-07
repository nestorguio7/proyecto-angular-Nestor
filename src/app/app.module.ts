import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NuevoComponent } from "./nuevo/nuevo.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListadoComponent } from "./listado/listado.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [AppComponent, NuevoComponent, ListadoComponent, EditarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
