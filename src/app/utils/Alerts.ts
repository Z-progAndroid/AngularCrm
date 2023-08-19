import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

const ERROR_ICON = 'error';
const CANCEL_BUTTON_TEXT = 'Cancelar';
const SUCCES_ICON = 'success';
const ALERT_ICON = 'warning';
const CONFIRM_BUTTON_COLOR = '#3085d6';
const CONFIRM_BUTTON_TEXT = 'Aceptar';
const CANCEL_BUTTON_COLOR = '#d33';
const INFO_ICON = 'info';
@Injectable({
    providedIn: 'root'
})
export class Alerts {
    static router: any;
    constructor(private router: Router) { }
    static error(titulo: string, mensaje: string, error: any): any {
        console.log(error);
        mensaje = error?.error?.mensaje ? error.error.mensaje : mensaje;
        return Swal.fire({
            icon: ERROR_ICON,
            title: titulo,
            text: mensaje,
            confirmButtonText: CONFIRM_BUTTON_TEXT,
            cancelButtonText: CANCEL_BUTTON_TEXT,
            confirmButtonColor: CONFIRM_BUTTON_COLOR,
            cancelButtonColor: CANCEL_BUTTON_COLOR,
        })
    }
    static success(titulo: string, mensaje: string): any {
        return Swal.fire({
            icon: SUCCES_ICON,
            title: titulo,
            text: mensaje,
            confirmButtonText: CONFIRM_BUTTON_TEXT,
            cancelButtonText: CANCEL_BUTTON_TEXT,
            confirmButtonColor: CONFIRM_BUTTON_COLOR,
            cancelButtonColor: CANCEL_BUTTON_COLOR,
        })
    }

    static warning(titulo: string, mensaje: string, confirmButtonText: string): any {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: ALERT_ICON,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: CANCEL_BUTTON_TEXT,
            confirmButtonColor: CONFIRM_BUTTON_COLOR,
            cancelButtonColor: CANCEL_BUTTON_COLOR,
        })
    }
    static info(titulo: string, mensaje: string): any {
        return Swal.fire({
            icon: INFO_ICON,
            title: titulo,
            text: mensaje,
            confirmButtonText: CONFIRM_BUTTON_TEXT,
            cancelButtonText: CANCEL_BUTTON_TEXT,
            confirmButtonColor: CONFIRM_BUTTON_COLOR,
            cancelButtonColor: CANCEL_BUTTON_COLOR,
        })
    }
}
