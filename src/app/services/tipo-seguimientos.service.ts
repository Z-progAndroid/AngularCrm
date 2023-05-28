import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { TipoSeguimientos } from '../models/tipo-seguimientos';
import { Mensaje } from '../models/mensaje';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoSeguimientosService implements CrudService<TipoSeguimientos>{

  constructor(private http: HttpClient) { }
  
  findAll(): Observable<TipoSeguimientos[]> {
    return this.http.get<TipoSeguimientos[]>(`${environment.urlBase}tipo_seguimiento/all`);
  }
  findById(id: number): Observable<TipoSeguimientos> {
    return this.http.get<TipoSeguimientos>(`${environment.urlBase}tipo_seguimiento?id=${id}`);
  }
  save(t: TipoSeguimientos): Observable<TipoSeguimientos> {
    return this.http.post<TipoSeguimientos>(`${environment.urlBase}tipo_seguimiento`, t);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}tipo_seguimiento?id=${id}`);
  }

}
