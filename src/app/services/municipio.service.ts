import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipo } from '../models/municipo';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }
  save(municipo: Municipo): Observable<Municipo> {
    return this.http.post<Municipo>(`${environment.urlBase}municipio`, municipo);
  }
  delete(id: number): Observable<Municipo> {
    return this.http.delete<Municipo>(`${environment.urlBase}municipio?id=${id}`);
  }
  findById(id: number): Observable<Municipo> {
    return this.http.get<Municipo>(`${environment.urlBase}municipio?id=${id}`);
  }
  findAll(): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`${environment.urlBase}municipio/all`);
  }
  findAllByProvincia(idProvincia): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`${environment.urlBase}municipio/municipiosByProvincia?idProvincia=${idProvincia}`);
  }
}
