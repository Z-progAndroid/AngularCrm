export class Inmueble {
    idInmueble: number;
    descripcion: String;
    direccion: String;
    codigoPostal: String;
    precio_venta: number;
    precio_alquiler: number;
    numHabitaciones: number;
    numBanos: number;
    metros_cuadrados: number;
    ano_construccion: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
    modificado: String;
    //Relaciones
    idTipoInmueble: number;
    idEstadoInmueble: number;
    idPais: String;
    idProvincia: number;
    idMunicipio: number;
    idUsuario: number;
    idBarrio: number;
    //PARA FRONT
    barrio: String;
    estadoInmueble: String;
    municipio: String;
    pais: String;
    provincia: String;
    tipoInmueble: String;
    imagen1:Uint8Array;
    imagen2:Uint8Array;
    imagen3:Uint8Array;
    imagen4:Uint8Array;
}
