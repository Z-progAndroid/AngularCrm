import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { TipoCita } from '../models/tipo-cita';
import { Mensaje } from '../models/mensaje';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class TipoCitaService implements CrudService<TipoCita>{

  constructor(private http: HttpClient) { }
  findAll(): Observable<TipoCita[]> {
    return this.http.get<TipoCita[]>(`${environment.urlBase}tipoCita/all`);
  }
  findById(id: number): Observable<TipoCita> {
    return this.http.get<TipoCita>(`${environment.urlBase}tipoCita?id=${id}`);
  }
  save(tipoCita: TipoCita): Observable<TipoCita> {
    return this.http.post<TipoCita>(`${environment.urlBase}tipoCita`, tipoCita);
  }

  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}tipoCita?id=${id}`);
  }
  exportarExcel(cabeceras: string[], estados: TipoCita[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.tipoCita = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}tipoCita/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
