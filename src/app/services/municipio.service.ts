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
    return this.http.post<Municipo>(`http://localhost:8080/api_v1/crm/municipio`, municipo);
  }
  delete(id: number): Observable<Municipo> {
    return this.http.delete<Municipo>(`http://localhost:8080/api_v1/crm/municipio?idMunicipio=${id}`);
  }
  findById(id: number): Observable<Municipo> {
    return this.http.get<Municipo>(`http://localhost:8080/api_v1/crm/municipio?idMunicipio=${id}`);
  }
  findAll(): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`http://localhost:8080/api_v1/crm/municipio/all`);
  }
  findAllByProvincia(idProvincia): Observable<Municipo[]> {
    return this.http.get<Municipo[]>(`http://localhost:8080/api_v1/crm/municipio/municipiosByProvincia?idProvincia=${idProvincia}`);
  }
}
