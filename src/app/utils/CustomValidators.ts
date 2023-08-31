import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static validarSeleccionOpcionPorDefectoValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const selectedOption = control.value;
            if (selectedOption === 'Seleciona una opción' || selectedOption === 0) {
                return { seleccionOpcionPorDefecto: true };
            }
            return null;
        };
    }

    static yearValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const year = control.value;

            // Verificar si el valor es numérico
            if (isNaN(year)) {
                return { 'invalidYear': true };
            }

            // Verificar si el año está dentro de un rango válido (por ejemplo, entre 1800 y el año actual)
            const currentYear = new Date().getFullYear();
            if (year < 1800 || year > currentYear) {
                return { 'invalidYearRange': true };
            }

            // El año es válido
            return null;
        };
    }
    static dateRangeValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const startDate = control.get('fechaInicio').value;
            const endDate = control.get('fechaFin').value;
            if (startDate && endDate && startDate > endDate) {
                return { dateRange: true };
            }
            return null;
        };
    }
    static validateDate(control: AbstractControl): ValidationErrors | null {
        const fechaInicio = control.get('fechaInicio');
        const horaInicio = control.get('fechaInicioTime');
        if (!fechaInicio || !horaInicio) {
            return null;
        }
        if (!fechaInicio.value || !horaInicio.value) {
            return { fechaHoraIncompleta: true };
        }
        const fechaHoraInicio = new Date(`${fechaInicio.value}T${horaInicio.value}`);
        const ahora = new Date();

        if (fechaHoraInicio <= ahora) {
            return { fechaHoraInvalida: true };
        }

        return null;
    }
    static passwordsMatchValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const contrasena = control.get('contrasena');
            const contrasenaRepetir = control.get('contrasenaRepetir');

            if (!contrasena || !contrasenaRepetir) {
                return null;
            }

            if (contrasena.value !== contrasenaRepetir.value) {
                contrasenaRepetir.setErrors({ passwordsNotMatch: true });
                return { passwordsNotMatch: true };
            }

            contrasenaRepetir.setErrors(null);
            return null;
        };
    }
}
