import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UsuarioService } from "../services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "../models/usuario";

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"]
})
export class ListadoComponent implements OnInit {
  grupo: FormGroup;
  clientes: Usuario[];

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
      });
    }
  }
}
