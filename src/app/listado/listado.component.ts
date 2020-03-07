import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UsuarioService } from "../services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "../models/usuario";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"]
})
export class ListadoComponent implements OnInit {
  grupo: FormGroup;
  clientes: Usuario[];
  edadProm: Number;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(
    private clienteService: UsuarioService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listar();
    this.clienteService.onActualizar.subscribe(() => this.listar());
    /* this.actRouter.paramMap.subscribe((data: any) => {
      //console.log('STATUS:> ',data.params.status);
      this.filtrar(data.params.status);
    }); */
  }
  listar() {
    if (location.pathname === "/") {
      console.log("[listar]");

      this.clienteService.listar().subscribe(resp => {
        console.log("EN LISTAR --->", resp["results"]);

        this.clientes = resp["results"];
        let temp = 0;
        this.clientes.forEach(element => {
          temp += element.edad;
        });
        this.edadProm = Math.floor(temp / this.clientes.length);
      });
    }
  }

  editarCliente(id) {
    console.log("[EDITAR]", id);

    this.router.navigate(["/", "editar", id]);
  }

  eliminarCliente(_id: string) {
    console.log("Eliminar usuario");

    this.clienteService.eliminar(_id).subscribe(resp => {
      console.log("result api: ", resp);
      this.clienteService.onActualizar.next();
      this.listar();
    });
  }
}
