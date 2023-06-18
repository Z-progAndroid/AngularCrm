import { Observable } from "rxjs";
import { Mensaje } from "../models/mensaje";

export interface CrudService<T> {
    findAll(): Observable<T[]>;
    findById(id: number): Observable<T>;
    save(item: T): Observable<T>;
    delete(id: number): Observable<Mensaje>;
}  