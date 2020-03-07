import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.scss"]
})
export class EditarComponent implements OnInit {
  id: string;
  grupo: FormGroup;

  constructor(
    private clienteService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.grupo = new FormGroup({
      //_id: new FormControl(),
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      fecha: new FormControl(new Date()),
      edad: new FormControl(null, Validators.required)
    });
    //this._id = this.activateRoute.snapshot.paramMap.get("_id")
    //Necesitamos un observador sino solo se ejecuta una vez
    this.activateRoute.paramMap.subscribe((data: any) => {
      this.id = data.params.id;
      console.log("[ID]", data.params.id);

      this.clienteService.detallar(this.id).subscribe(resp => {
        console.log("[RESP]", resp["result"]);
        this.grupo.patchValue(resp["result"]);
        /* this.grupo.get("status").setValue(resp["result"].status, {
          onlySelf: true
        }); */
      });
    });
  }

  actualizar() {
    this.clienteService
      .modificar(this.grupo.getRawValue(), this.id)
      .subscribe(resp => {
        this.clienteService.onActualizar.next();
        this.router.navigate(["/"]);
        //alert("Tarea Actualizado!")
      });
  }

  selectFecha(e) {
    console.log("event", e);
    console.log("Edad: ", this.calculateAge(e.target.value));
    this.grupo.patchValue({ edad: this.calculateAge(e.target.value) });
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
