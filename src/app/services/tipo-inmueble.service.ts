import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoInmueble } from '../models/tipo-inmueble';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoInmuebleService {

  constructor(private http: HttpClient) { }
  save(tipoInmueble: TipoInmueble): Observable<TipoInmueble> {
    return this.http.post<TipoInmueble>(`${environment.urlBase}tipoInmueble`, tipoInmueble);
  }
  delete(id: number): Observable<TipoInmueble> {
    return this.http.delete<TipoInmueble>(`${environment.urlBase}tipoInmueble?id=${id}`);
  }
  findById(id: number): Observable<TipoInmueble> {
    return this.http.get<TipoInmueble>(`${environment.urlBase}tipoInmueble?id=${id}`);
  }
  findAll(): Observable<TipoInmueble[]> {
    return this.http.get<TipoInmueble[]>(`${environment.urlBase}tipoInmueble/all`);
  }
}
