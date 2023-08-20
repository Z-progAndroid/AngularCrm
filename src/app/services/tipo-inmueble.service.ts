import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoInmueble } from '../models/tipo-inmueble';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estadocontrato } from '../models/estadocontrato';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class TipoInmuebleService {

  constructor(private http: HttpClient) { }
  save(tipoInmueble: TipoInmueble): Observable<TipoInmueble> {
    return this.http.post<TipoInmueble>(`${environment.urlBase}tipoInmueble`, tipoInmueble);
  }
  delete(id: number): Observable<TipoInmueble> {
    return this.http.delete<TipoInmueble>(`${environment.urlBase}tipoInmueble?idTipoInmueble=${id}`);
  }
  findById(id: number): Observable<TipoInmueble> {
    return this.http.get<TipoInmueble>(`${environment.urlBase}tipoInmueble?idTipoInmueble=${id}`);
  }
  findAll(): Observable<TipoInmueble[]> {
    return this.http.get<TipoInmueble[]>(`${environment.urlBase}tipoInmueble/all`);
  }
  exportarExcel(cabeceras: string[], estados: TipoInmueble[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.tiposInmueble = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}tipoInmueble/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
