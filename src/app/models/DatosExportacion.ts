import { Contrato } from "./contrato";
import { EstadoCitas } from "./estado-citas";
import { EstadoInmueble } from "./estado-inmueble";
import { EstadoTarea } from "./estado-tarea";
import { EstadoUsuario } from "./estado-usuario";
import { Estadocontrato } from "./estadocontrato";
import { Inmueble } from "./inmueble";
import { Tarea } from "./tarea";
import { TipoContrato } from "./tipo-contrato";
import { User } from "./user";

export class DatosExportacion {
    cabeceras: string[];
    contratos: Contrato[];
    usuarios: User[];
    inmuebles: Inmueble[];
    tareas: Tarea[];
    estadoContratos: Estadocontrato[];
    estadoInmuebles: EstadoInmueble[];
    estadosTareas: EstadoTarea[];
    estadosUsuario: EstadoUsuario[];
    estadosCitas: EstadoCitas[];
    tiposContrato: TipoContrato[];
}