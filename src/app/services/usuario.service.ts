import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlBase}usuario/all`);
  }
  save(user: User): Observable<User> {
    return this.http.post<User>(`${environment.urlBase}usuario`, user);
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.urlBase}usuario?id=${id}`);
  }
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.urlBase}usuario?id=${id}`);
  }
  findByParams(user:User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.urlBase}usuario/search`, user);
  }
  findAllUserAdminORAgente() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.urlBase}usuario/all/admin-or-agent`);
  }
}
