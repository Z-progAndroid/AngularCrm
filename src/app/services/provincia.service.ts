import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatosExportacion } from '../models/DatosExportacion';
import { Estadocontrato } from '../models/estadocontrato';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient) { }
  save(provincia: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(`${environment.urlBase}provincia`, provincia);
  }
  delete(id: number): Observable<Provincia> {
    return this.http.delete<Provincia>(`${environment.urlBase}provincia?idProvincia=${id}`);
  }
  findById(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${environment.urlBase}provincia?idProvincia=${id}`);
  }
  findAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${environment.urlBase}provincia/all`);
  }
  findAllByIdPais(idPais): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${environment.urlBase}provincia/provinciasByPais?idPais=${idPais}`);
  }
  exportarExcel(cabeceras: string[], estados: Provincia[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.provincias = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}provincia/download-excel`, datosExportacion, { headers, responseType: 'blob' });
  }
}
