import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoInmueble } from '../models/estado-inmueble';

@Injectable({
  providedIn: 'root'
})
export class EstadoInmuebleService {

  constructor(private http: HttpClient) { }
  save(estadoInmueble: EstadoInmuebleService): Observable<EstadoInmueble> {
    return this.http.post<EstadoInmueble>(`${environment.urlBase}estadoInmueble`, estadoInmueble);
  }
  delete(id: number): Observable<EstadoInmueble> {
    return this.http.delete<EstadoInmueble>(`${environment.urlBase}estadoInmueble?id=${id}`);
  }
  findById(id: number): Observable<EstadoInmueble> {
    return this.http.get<EstadoInmueble>(`${environment.urlBase}estadoInmueble?id=${id}`);
  }
  findAll(): Observable<EstadoInmueble[]> {
    return this.http.get<EstadoInmueble[]>(`${environment.urlBase}estadoInmueble/all`);
  }

}
