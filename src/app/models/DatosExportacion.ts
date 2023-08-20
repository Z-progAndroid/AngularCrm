import { Contrato } from "./contrato";
import { Estadocontrato } from "./estadocontrato";
import { Inmueble } from "./inmueble";
import { Tarea } from "./tarea";
import { User } from "./user";

export class DatosExportacion { 
    cabeceras: string[];
    contratos: Contrato[];
    usuarios: User[];
    inmuebles: Inmueble[];
    tareas: Tarea[];
    estadoContratos: Estadocontrato[];
}