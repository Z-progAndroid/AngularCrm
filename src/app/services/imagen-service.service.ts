import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';


@Injectable({
  providedIn: 'root'
})
export class ImagenServiceService {

  constructor(private http: HttpClient) { }

  saveImage(formData: FormData, idInmueble: string): Observable<Mensaje> {
    formData.append("idInmueble", idInmueble);
    return this.http.post<Mensaje>(`${environment.urlBase}imagen`, formData);
  }

  getImage(imageName: string, idInmueble: string): Observable<HttpResponse<Blob>> {
    const url = `${environment.urlBase}imagen`;
    return this.http.get(url, {
      params: {
        imageName: imageName,
        idInmueble: idInmueble
      },
      responseType: 'blob',
      observe: 'response'
    });
  }
  deleteImagen(imageName: String, idInmueble: String): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${environment.urlBase}imagen?imageName=${imageName}&idInmueble=${idInmueble}`);
  }

}
