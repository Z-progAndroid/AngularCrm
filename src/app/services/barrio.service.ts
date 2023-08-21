import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia';
import { Barrio } from '../models/barrio';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  constructor(private http: HttpClient) { }
  save(barrio: Barrio): Observable<Barrio> {
    return this.http.post<Barrio>(`${environment.urlBase}barrio`, barrio);
  }
  delete(id: number): Observable<Barrio> {
    return this.http.delete<Barrio>(`${environment.urlBase}barrio?idBarrio=${id}`);
  }
  findById(id: number): Observable<Barrio> {
    return this.http.get<Barrio>(`${environment.urlBase}barrio?idBarrio=${id}`);
  }
  findAll(): Observable<Barrio[]> {
    return this.http.get<Barrio[]>(`${environment.urlBase}barrio/all`);
  }
  findAllByMunicipio(idMunicipio): Observable<Barrio[]> {
    return this.http.get<Barrio[]>(`${environment.urlBase}barrio/findAllByMunicipio?idMunicipio=${idMunicipio}`);
  }
  exportarExcel(cabeceras: string[], estados: Barrio[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.barrios = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}barrio/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
