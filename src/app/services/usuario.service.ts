import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";
import { Observable, Subject } from "rxjs";
import { delay, map, filter, pluck } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  onActualizar: Subject<any> = new Subject();
  onBusqueda: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<any>(
      "http://localhost:3001/cliente"
    ); /* .pipe(delay(100)) */
  }

  detallar(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:3001/cliente/${id}`);
  }

  insertar(cliente: Usuario): Observable<any> {
    return this.http.post(`http://localhost:3001/cliente`, cliente);
  }

  modificar(cliente: Usuario, _id: string): Observable<any> {
    return this.http.put(`http://localhost:3001/cliente/${_id}`, cliente);
  }

  eliminar(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3001/cliente/${_id}`);
  }
}
