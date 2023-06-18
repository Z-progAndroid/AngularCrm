import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { TipoContrato } from '../models/tipo-contrato';
import { Mensaje } from '../models/mensaje';
import { environment } from 'src/environments/environment';

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
}
