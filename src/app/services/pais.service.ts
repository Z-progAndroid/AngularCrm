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
  delete(id: string): Observable<Pais> {
    return this.http.delete<Pais>(`${environment.urlBase}pais?idPais=${id}`);
  }
  findById(id: string): Observable<Pais> {
    return this.http.get<Pais>(`${environment.urlBase}pais?idPais=${id}`);
  }
  findAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.urlBase}pais/all`);
  }
}
