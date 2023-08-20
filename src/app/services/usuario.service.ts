import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { DatosExportacion } from '../models/datosExportacion';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlBase}usuario/all`);
  }
  save(user: User): Observable<User> {
    return this.http.post<User>(`${environment.urlBase}usuario`, user);
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.urlBase}usuario?id=${id}`);
  }
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.urlBase}usuario?id=${id}`);
  }
  findByParams(user:User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.urlBase}usuario/search`, user);
  }
  findAllUserAdminORAgente() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.urlBase}usuario/all/admin-or-agent`);
  }
  findAllClientes(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.urlBase}usuario/all/usuarios`);
  }
  exportarExcel(cabeceras: string[], usuarios: User[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.usuarios = usuarios;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');

    return this.http.post(`${environment.urlBase}usuario/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
