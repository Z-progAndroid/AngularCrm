import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../interfaces/CrudService';
import { Mensaje } from '../models/mensaje';
import { Contrato } from '../models/contrato';
import { DatosExportacion } from '../models/DatosExportacion';


@Injectable({
    providedIn: 'root'
})
export class ContratoService implements CrudService<Contrato>{

    constructor(private http: HttpClient) { }
    findAll(): Observable<Contrato[]> {
        return this.http.get<Contrato[]>(`${environment.urlBase}contrato/all`);
    }
    search(item: Contrato): Observable<Contrato[]> {
        return this.http.post<Contrato[]>(`${environment.urlBase}contrato/search`, item);
    }
    findById(id: number): Observable<Contrato> {
        return this.http.get<Contrato>(`${environment.urlBase}contrato?idContrato=${id}`);
    }
    save(item: Contrato): Observable<Contrato> {
        return this.http.post<Contrato>(`${environment.urlBase}contrato`, item);
    }
    delete(id: number): Observable<Mensaje> {
        return this.http.delete<Mensaje>(`${environment.urlBase}contrato?idContrato=${id}`);
    }
    generarContratoPdf(idContrato: Number): Observable<Blob> {
        const headers = new HttpHeaders({ RESPONSETYPE: 'arraybuffer' as 'json' });
        return this.http.get<Blob>(`${environment.urlBase}contrato/download-pdf?idContrato=${idContrato}`, { headers, responseType: 'arraybuffer' as 'json' });
    }
    exportarExcel(cabeceras: string[], contratos: Contrato[]): Observable<Blob> {
        const datosExportacion = new DatosExportacion();
        datosExportacion.cabeceras = cabeceras;
        datosExportacion.contratos = contratos;
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/octet-stream');

        return this.http.post(`${environment.urlBase}contrato/download-excel`, datosExportacion, { headers, responseType: 'blob' });
    }

}