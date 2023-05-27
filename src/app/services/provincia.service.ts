import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient) { }
  save(provincia: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(`${environment.urlBase}provincia`, provincia);
  }
  delete(id: number): Observable<Provincia> {
    return this.http.delete<Provincia>(`${environment.urlBase}provincia?id=${id}`);
  }
  findById(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${environment.urlBase}provincia?id=${id}`);
  }
  findAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${environment.urlBase}provincia/all`);
  }
  findAllByIdPais(idPais): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${environment.urlBase}provincia/provinciasByPais?idPais=${idPais}`);
  }
}
