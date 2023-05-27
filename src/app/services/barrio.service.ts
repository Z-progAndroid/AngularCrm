import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia';
import { Barrio } from '../models/barrio';

@Injectable({
  providedIn: 'root'
})
export class BarrioService {

  constructor(private http: HttpClient) { }
  save(barrio: Barrio): Observable<Barrio> {
    return this.http.post<Barrio>(`${environment.urlBase}barrio`, barrio);
  }
  delete(id: number): Observable<Barrio> {
    return this.http.delete<Barrio>(`${environment.urlBase}barrio?id=${id}`);
  }
  findById(id: number): Observable<Barrio> {
    return this.http.get<Barrio>(`${environment.urlBase}barrio?id=${id}`);
  }
  findAll(): Observable<Barrio[]> {
    return this.http.get<Barrio[]>(`${environment.urlBase}barrio/all`);
  }
  findAllByMunicipio(idMunicipio): Observable<Barrio[]> {
    return this.http.get<Barrio[]>(`${environment.urlBase}barrio/findAllByMunicipio?idMunicipio=${idMunicipio}`);
  }
}
