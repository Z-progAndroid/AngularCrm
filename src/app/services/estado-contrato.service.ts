import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { Estadocontrato } from '../models/estadocontrato';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoContratoService implements CrudService<Estadocontrato>{

  constructor(private http: HttpClient) { }
  findAll(): Observable<Estadocontrato[]> {
    return this.http.get<Estadocontrato[]>(`${environment.urlBase}estado-contrato/all`);
  }
  findById(id: number): Observable<Estadocontrato> {
    return this.http.get<Estadocontrato>(`${environment.urlBase}estado-contrato?idEstadoContrato=${id}`);
  }
  maxId(): Observable<number> {
    return this.http.get<number>(`${environment.urlBase}estado-contrato/max-id`);
  }
  save(item: Estadocontrato): Observable<Estadocontrato> {
    return this.http.post<Estadocontrato>(`${environment.urlBase}estado-contrato`, item);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}estado-contrato?idEstadoContrato=${id}`);
  }
  exportarExcel(cabeceras: string[], estados: Estadocontrato[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.estadoContratos = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}estado-contrato/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
