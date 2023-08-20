import { Contrato } from "./contrato";
import { Inmueble } from "./inmueble";
import { Tarea } from "./tarea";
import { User } from "./user";

export class DatosExportacion { 
    cabeceras: string[];
    contratos: Contrato[];
    usuarios: User[];
    inmuebles: Inmueble[];
    tareas: Tarea[];
}