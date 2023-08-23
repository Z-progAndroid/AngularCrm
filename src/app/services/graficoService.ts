import { Injectable } from "@angular/core";
import { Cita } from "../models/cita";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CrudService } from "../interfaces/CrudService";
import { Observable } from "rxjs";
import { Mensaje } from "../models/mensaje";
import { environment } from "src/environments/environment";
import { Grafico } from "../models/grafico";

@Injectable({
    providedIn: 'root'
})
export class GraficoService {
    constructor(private http: HttpClient) { }
    graficoAdmin(): Observable<Grafico> {
        return this.http.get<Grafico>(`${environment.urlBase}graficos/graficoAdmin`);
    }
    graficoAgente(idUsuario): Observable<Grafico> {
        return this.http.get<Grafico>(`${environment.urlBase}graficos/graficoAgente?idUsuario=${idUsuario}`);
    }
}