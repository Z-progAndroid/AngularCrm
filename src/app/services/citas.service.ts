import { Injectable } from "@angular/core";
import { Cita } from "../models/cita";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CrudService } from "../interfaces/CrudService";
import { Observable } from "rxjs";
import { Mensaje } from "../models/mensaje";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CitasService implements CrudService<Cita>{
    constructor(private http: HttpClient) { }
    findAll(): Observable<Cita[]> {
        return this.http.get<Cita[]>(`${environment.urlBase}cita/all`);
    }
    findById(id: number): Observable<Cita> {
        return this.http.get<Cita>(`${environment.urlBase}cita?id=${id}`);
    }
    save(item: Cita): Observable<Cita> {
        return this.http.post<Cita>(`${environment.urlBase}cita`, item);
    }
    delete(id: number): Observable<Mensaje> {
        return this.http.delete<Mensaje>(`${environment.urlBase}cita?id=${id}`);
    }
    checkAvailability(startDate: Date, endDate: Date, idInmueble: number): Observable<Mensaje> {
        const params = new HttpParams()
            .set('startDate', startDate.toISOString())
            .set('endDate', endDate.toISOString())
            .set('idInmueble', idInmueble.toString());

        return this.http.get<Mensaje>(`${environment.urlBase}cita/checkAvailability`, { params });
    }
    findAllPendienteYActivas(): Observable<Cita[]> {
        return this.http.get<Cita[]>(`${environment.urlBase}cita/pendientesYActivas`);
    }
}
