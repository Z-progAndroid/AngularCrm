import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadoUsuario } from '../models/estado-usuario';
import { DatosExportacion } from '../models/DatosExportacion';
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
  exportarExcel(cabeceras: string[], estados: EstadoUsuario[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.estadosUsuario = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}usuario-estado/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
