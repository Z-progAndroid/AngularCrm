import { Contrato } from "./contrato";
import { Inmueble } from "./inmueble";
import { User } from "./user";

export class DatosExportacion { 
    cabeceras: string[];
    contratos: Contrato[];
    usuarios: User[];
    inmuebles: Inmueble[];
}