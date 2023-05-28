import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadoUsuario } from '../models/estado-usuario';
@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {

  constructor(private http: HttpClient) { }
  save(estadoUsuario: EstadoUsuario): Observable<EstadoUsuario> {
    return this.http.post<EstadoUsuario>(`${environment.urlBase}usuario-estado`, estadoUsuario);
  }
  delete(id: number): Observable<EstadoUsuario> {
    return this.http.delete<EstadoUsuario>(`${environment.urlBase}usuario-estado?id=${id}`);
  }
  findById(id: number): Observable<EstadoUsuario> {
    return this.http.get<EstadoUsuario>(`${environment.urlBase}usuario-estado?id=${id}`);
  }
  findAll(): Observable<EstadoUsuario[]> {
    return this.http.get<EstadoUsuario[]>(`${environment.urlBase}usuario-estado/all`);
  }
}
