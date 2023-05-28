import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadoTarea } from '../models/estado-tarea';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class EstadoTareaService implements CrudService<EstadoTarea> {

  constructor(private http: HttpClient) { }

  findAll(): Observable<EstadoTarea[]> {
    return this.http.get<EstadoTarea[]>(`http://localhost:8080/api_v1/crm/estado_tarea/all`);
  }
  findById(id: number): Observable<EstadoTarea> {
    return this.http.get<EstadoTarea>(`http://localhost:8080/api_v1/crm/estado_tarea?idEstadoTarea=${id}`);
  }
  save(item: EstadoTarea): Observable<EstadoTarea> {
    return this.http.post<EstadoTarea>(`http://localhost:8080/api_v1/crm/estado_tarea`, item);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`http://localhost:8080/api_v1/crm/estado_tarea?idEstadoTarea=${id}`);
  }
  
}