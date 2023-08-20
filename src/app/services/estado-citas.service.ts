import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { EstadoCitas } from '../models/estado-citas';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoCitasService implements CrudService<EstadoCitas>{

  constructor(private http: HttpClient) { }
  
  findAll(): Observable<EstadoCitas[]> {
    
    return this.http.get<EstadoCitas[]>(`${environment.urlBase}cita-estado/all`);
  }
  findById(id: number): Observable<EstadoCitas> {
    return this.http.get<EstadoCitas>(`${environment.urlBase}cita-estado?id=${id}`);
  }
  save(item: EstadoCitas): Observable<EstadoCitas> {
    return this.http.post<EstadoCitas>(`${environment.urlBase}cita-estado`, item);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.urlBase}cita-estado?id=${id}`);
  }
  exportarExcel(cabeceras: string[], estados: EstadoCitas[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.estadosCitas = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}cita-estado/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
