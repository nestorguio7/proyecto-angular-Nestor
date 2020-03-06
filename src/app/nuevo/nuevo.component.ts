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
      status: new FormControl(null, Validators.required),
      fecha: new FormControl(new Date())
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

  volver() {
    this.router.navigate(["/"]);
  }
}
