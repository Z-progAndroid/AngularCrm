import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  save(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${environment.urlBase}pais`, pais);
  }
  delete(id: number): Observable<Pais> {
    return this.http.delete<Pais>(`${environment.urlBase}pais?id=${id}`);
  }
  findById(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${environment.urlBase}pais?id=${id}`);
  }
  findAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.urlBase}pais/all`);
  }
}
