import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia';
import { Pais } from '../models/pais';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  save(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${environment.urlBase}pais`, pais);
  }
  delete(id: string): Observable<Pais> {
    return this.http.delete<Pais>(`${environment.urlBase}pais?idPais=${id}`);
  }
  findById(id: string): Observable<Pais> {
    return this.http.get<Pais>(`${environment.urlBase}pais?idPais=${id}`);
  }
  findAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.urlBase}pais/all`);
  }
  exportarExcel(cabeceras: string[], estados: Pais[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.paises = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}pais/download-excel`, datosExportacion, { headers, responseType: 'blob' });
  }
}
