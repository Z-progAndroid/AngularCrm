import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipo } from '../models/municipo';
import { DatosExportacion } from '../models/DatosExportacion';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }
  save(municipo: Municipo): Observable<Municipo> {
    return this.http.post<Municipo>(`${environment.urlBase}municipio`, municipo);
  }
  delete(id: number): Observable<Municipo> {
    return this.http.delete<Municipo>(`${environment.urlBase}municipio?idMunicipio=${id}`);
  }
  findById(id: number): Observable<Municipo> {
    return this.http.get<Municipo>(`${environment.urlBase}municipio?idMunicipio=${id}`);
  }
  findAll(): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`${environment.urlBase}municipio/all`);
  }
  findAllByProvincia(idProvincia): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`${environment.urlBase}municipio/municipiosByProvincia?idProvincia=${idProvincia}`);
  }
  exportarExcel(cabeceras: string[], estados: Municipo[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.municipios = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}municipio/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
