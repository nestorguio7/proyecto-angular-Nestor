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

  selectFecha(e) {
    console.log("event", e);
    console.log("Edad: ", this.calculateAge(e.target.value));
  }

  calculateAge(dateString) {
    var hoy = new Date();
    var fechaNacimiento = new Date(dateString);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  }

  volver() {
    this.router.navigate(["/"]);
  }
}
