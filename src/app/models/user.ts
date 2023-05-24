export class User {
    idUsuario: number;
    nombre: String;
    apellido: String;
    email: String;
    username: String;
    password: String;
    telefono: String;
    direccion: String;
    dni: String;
    fechaCreacion: Date;
    fechaModificacion: Date;
    modificado: String;/* no puede estar vacío*/
    idEstadoUsuario: number;/* no puede estar vacío*/
    idRol: number;/* no puede estar vacío*/
    /* Datos front*/
    rol: String;
    estadoUsuario: String;
}