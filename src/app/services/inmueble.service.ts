import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inmueble } from '../models/inmueble';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';
import { DatosExportacion } from '../models/DatosExportacion';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private http: HttpClient) { }

  save(inmueble: Inmueble): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${environment.urlBase}inmueble`, inmueble);
  }

  search(inmueble: Inmueble): Observable<Inmueble[]> {
    return this.http.post<Inmueble[]>(`${environment.urlBase}inmueble/search`, inmueble);
  }
  searchSinRelaciones(inmueble: Inmueble): Observable<Inmueble[]> {
    return this.http.post<Inmueble[]>(`${environment.urlBase}inmueble/searchSinRelaciones`, inmueble);
  }
  delete(id: number): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}inmueble?idInmueble=${id}`);
  }
  findById(id: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${environment.urlBase}inmueble?idInmueble=${id}`);
  }

  findAll(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${environment.urlBase}inmueble/all`);
  }
  findAllSinRelaciones(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${environment.urlBase}inmueble/findAllRelaciones`);
  }
  findAllDisponibles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${environment.urlBase}inmueble/findAllDisponibles`);
  }
  generarInmuebleDetallePdf(idInmueble: Number): Observable<Blob> {
    const headers = new HttpHeaders({ RESPONSETYPE: 'arraybuffer' as 'json' });
    return this.http.get<Blob>(`${environment.urlBase}inmueble/download-pdf?idInmueble=${idInmueble}`, { headers, responseType: 'arraybuffer' as 'json' });
  }
  saveImage(formData: FormData, idInmueble: string, idImagen: string): Observable<Mensaje> {
    formData.append("idInmueble", idInmueble);
    formData.append("idImagen", idImagen);
    return this.http.post<Mensaje>(`${environment.urlBase}inmueble/uploadImage`, formData);
  }
  deleteImage(idInmueble: string, idImagen: string): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}inmueble/deleteImage?idInmueble=${idInmueble}&idImagen=${idImagen}`);
  }
  exportarExcel(cabeceras: string[], contratos: Inmueble[]): Observable<Blob> {
    const datosExportacion = new DatosExportacion();
    datosExportacion.cabeceras = cabeceras;
    datosExportacion.inmuebles = contratos;
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/octet-stream');

    return this.http.post(`${environment.urlBase}inmueble/download-excel`, datosExportacion, { headers, responseType: 'blob' });
  }
  obtenerInmueblesPorUsuario(idUsuario: number): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${environment.urlBase}inmueble/obtenerInmueblesPorUsuario?idUsuario=${idUsuario}`);
  }
}
