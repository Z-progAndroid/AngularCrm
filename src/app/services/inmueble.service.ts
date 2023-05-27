import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inmueble } from '../models/inmueble';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private http: HttpClient) { }

  save(inmueble: Inmueble): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${environment.urlBase}inmueble`, inmueble);
  }

  search(inmueble: Inmueble): Observable<Inmueble[]> {
    return this.http.post<Inmueble[]>(`${environment.urlBase}inmueble/search`, inmueble);
  }

  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}inmueble?idInmueble=${id}`);
  }
  findById(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${environment.urlBase}inmueble?idInmueble=${id}`);
  }

  findAll(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${environment.urlBase}inmueble/all`);
  }
}
