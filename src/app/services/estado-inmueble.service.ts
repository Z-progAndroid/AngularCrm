import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoInmueble } from '../models/estado-inmueble';
import { Mensaje } from '../models/mensaje';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoInmuebleService {

  constructor(private http: HttpClient) { }
  save(estadoInmueble: EstadoInmueble): Observable<EstadoInmueble> {
    return this.http.post<EstadoInmueble>(`${environment.urlBase}estadoInmueble`, estadoInmueble);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}estadoInmueble?idEstadoInmueble=${id}`);
  }
  findById(id: number): Observable<EstadoInmueble> {
    return this.http.get<EstadoInmueble>(`${environment.urlBase}estadoInmueble?idEstadoInmueble=${id}`);
  }
  findAll(): Observable<EstadoInmueble[]> {
    return this.http.get<EstadoInmueble[]>(`${environment.urlBase}estadoInmueble/all`);
  }
  exportarExcel(cabeceras: string[], estados: EstadoInmueble[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.estadoInmuebles = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}estadoInmueble/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
