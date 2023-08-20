import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "../interfaces/CrudService";
import { Tarea } from "../models/tarea";
import { Mensaje } from "../models/mensaje";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DatosExportacion } from "../models/datosExportacion";


@Injectable({
    providedIn: 'root'
})
export class TareaService implements CrudService<Tarea> {
    constructor(private http: HttpClient) { }
    save(tarea: Tarea): Observable<Tarea> {
        return this.http.post<Tarea>(`${environment.urlBase}tarea`, tarea);
    }
    delete(id: number): Observable<Mensaje> {
        return this.http.delete<Mensaje>(`${environment.urlBase}tarea?idTarea=${id}`);
    }
    findById(id: number): Observable<Tarea> {
        return this.http.get<Tarea>(`${environment.urlBase}tarea?idTarea=${id}`);
    }
    findAll(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(`${environment.urlBase}tarea/all`);
    }
    findAllByParams(tarea :Tarea): Observable<Tarea[]> {
        return this.http.post<Tarea[]>(`${environment.urlBase}tarea/search`,tarea);
    }
    exportarExcel(cabeceras: string[], tareas: Tarea[]): Observable<Blob> {
        const datosExportacion = new DatosExportacion();
        datosExportacion.cabeceras = cabeceras;
        datosExportacion.tareas = tareas;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/octet-stream');
        return this.http.post(`${environment.urlBase}tarea/download-excel`, datosExportacion, { headers, responseType: 'blob' });
    }

}  