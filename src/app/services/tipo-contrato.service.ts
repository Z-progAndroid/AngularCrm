import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { TipoContrato } from '../models/tipo-contrato';
import { Mensaje } from '../models/mensaje';
import { environment } from 'src/environments/environment';
import { DatosExportacion } from '../models/DatosExportacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoContratoService implements CrudService<TipoContrato> {
  constructor(private http: HttpClient) { }
  findAll() {
    return this.http.get<TipoContrato[]>(`${environment.urlBase}tipo-contrato/all`);
  }
  findById(id: number) {
    return this.http.get<TipoContrato>(`${environment.urlBase}tipo-contrato?idTipoContrato=${id}`);
  }
  save(t: TipoContrato) {
    return this.http.post<TipoContrato>(`${environment.urlBase}tipo-contrato`, t);
  }
  delete(id: number) {
    return this.http.delete<Mensaje>(`${environment.urlBase}tipo-contrato?idTipoContrato=${id}`);
  }
  exportarExcel(cabeceras: string[], estados: TipoContrato[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.tiposContrato = estados;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/octet-stream');
    return this.http.post(`${environment.urlBase}tipo-contrato/download-excel`, datosExportacion, { headers, responseType: 'blob' });
}
}
