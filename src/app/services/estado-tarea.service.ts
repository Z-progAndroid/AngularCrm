import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadoTarea } from '../models/estado-tarea';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoTareaService implements CrudService<EstadoTarea> {

  constructor(private http: HttpClient) { }

  findAll(): Observable<EstadoTarea[]> {
    return this.http.get<EstadoTarea[]>(`${environment.urlBase}estado_tarea/all`);
  }
  findById(id: number): Observable<EstadoTarea> {
    return this.http.get<EstadoTarea>(`${environment.urlBase}estado_tarea?idEstadoTarea=${id}`);
  }
  save(item: EstadoTarea): Observable<EstadoTarea> {
    return this.http.post<EstadoTarea>(`${environment.urlBase}estado_tarea`, item);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}estado_tarea?idEstadoTarea=${id}`);
  }
  exportarExcel(cabeceras: string[], estados: EstadoTarea[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.estadosTareas = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}estado_tarea/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}