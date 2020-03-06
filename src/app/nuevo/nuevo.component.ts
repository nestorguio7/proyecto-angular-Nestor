import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.scss"]
})
export class NuevoComponent implements OnInit {
  grupo: FormGroup;

  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.grupo = new FormGroup({
      //id: new FormControl(_.uniqueId('000')),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fecha: new FormControl(new Date()),
      status: new FormControl(null, Validators.required)
    });
  }

  newUser() {
    console.log("NUEVO::: ", this.grupo.getRawValue());
    this.userService.insertar(this.grupo.getRawValue()).subscribe(() => {
      this.userService.onActualizar.next();
      this.router.navigate(["/tareas"]);
      //alert('Tarea Creada con éxito!')
    });
  }

  selectFecha(c, e) {
    console.log("change", c);
    console.log("event", e.target.value);
    let fecha = e.target.value;
    let ano = fecha.split("-")[0];
    console.log("AÑO---> ", ano);
    console.log("ACTUAL: ", new Date().getFullYear());
  }

  volver() {
    this.router.navigate(["/"]);
  }
}
