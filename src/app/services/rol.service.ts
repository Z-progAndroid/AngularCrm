import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  save(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${environment.urlBase}rol`, rol);
  }
  delete(id: number): Observable<Rol> {
    return this.http.delete<Rol>(`${environment.urlBase}rol?id=${id}`);
  }
  findById(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${environment.urlBase}rol?id=${id}`);
  }
  findAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.urlBase}rol/all`);
  }
}
