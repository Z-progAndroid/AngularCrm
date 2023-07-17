import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static validarSeleccionOpcionPorDefectoValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const selectedOption = control.value;
            if (selectedOption === 'Seleciona una opción') {
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
}
