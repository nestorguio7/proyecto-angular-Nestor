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
    return this.http.get<Usuario>(`http://localhost:3001/tareas/detalle/${id}`);
  }

  filtrar(param): Observable<Usuario[]> {
    console.log("FILTRAR> ", param);
    return this.http.get<any>("http://localhost:3001/tareas").pipe(
      map(tarea => {
        return tarea["results"].filter(task => {
          return task.status === param;
        });
      })
    );
  }

  insertar(tarea: Usuario): Observable<any> {
    return this.http.post(`http://localhost:3001/cliente`, tarea);
  }

  modificar(tarea: Usuario, _id: string): Observable<any> {
    return this.http.put(`http://localhost:3001/tareas/${_id}`, tarea);
  }

  eliminar(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3001/tareas/${_id}`);
  }
}
