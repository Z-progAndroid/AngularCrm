import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../interfaces/CrudService';
import { TipoPago } from '../models/tipo-pago';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService implements CrudService<TipoPago>{

  constructor(private http: HttpClient) { }
  findAll():Observable<TipoPago[]>{
    return this.http.get<TipoPago[]>(`${environment.urlBase}tipo-pago/all`);
  }
  findById(id: number): Observable<TipoPago>{
    return this.http.get<TipoPago>(`${environment.urlBase}tipo-pago?idTipoPago=${id}`);
  }
  save(tipoPago: TipoPago): Observable<TipoPago>{
    return this.http.post<TipoPago>(`${environment.urlBase}tipo-pago`, tipoPago);
  }
  delete(id: number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(`${environment.urlBase}tipo-pago?idTipoPago=${id}`);
  }
}
