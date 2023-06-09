import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Alerts {
    static router: Router;

    constructor(private router: Router) {
        Alerts.router = router;
    }
    static error(titulo: string, mensaje: string, error: any): any {
        console.log(error);
        mensaje = error.error.mensaje ? error.error.mensaje : mensaje;
        return Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensaje,
        })
    }
    static errorConRedirect(titulo: string, mensaje: string, url: string, error: any): any {
        console.log(error);
        mensaje = error.error.mensaje ? error.error.mensaje : mensaje;
        return Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensaje,
        }).then((result) => {
            this.router.navigate([url]);
        })
    }
    static success(titulo: string, mensaje: string): any {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
        })
    }

    static warning(titulo: string, mensaje: string, confirmButtonText: string): any {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        })
    }
    static info(titulo: string, mensaje: string): any {
        return Swal.fire({
            icon: 'info',
            title: titulo,
            text: mensaje,
        })
    }
}
