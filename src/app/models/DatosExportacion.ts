import { B } from "@fullcalendar/core/internal-common";
import { Contrato } from "./contrato";
import { EstadoCitas } from "./estado-citas";
import { EstadoInmueble } from "./estado-inmueble";
import { EstadoTarea } from "./estado-tarea";
import { EstadoUsuario } from "./estado-usuario";
import { Estadocontrato } from "./estadocontrato";
import { Inmueble } from "./inmueble";
import { Municipo } from "./municipo";
import { Pais } from "./pais";
import { Provincia } from "./provincia";
import { Tarea } from "./tarea";
import { TipoCita } from "./tipo-cita";
import { TipoContrato } from "./tipo-contrato";
import { TipoInmueble } from "./tipo-inmueble";
import { TipoPago } from "./tipo-pago";
import { User } from "./user";
import { Barrio } from "./barrio";

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
    tiposInmueble: TipoInmueble[];
    tiposPago: TipoPago[];
    tipoCita: TipoCita[];
    paises: Pais[];
    provincias: Provincia[];
    municipios: Municipo[];
    barrios: Barrio[];
}