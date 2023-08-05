export class Utils {
    static isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined || value === "";
    }
    static isFormEmpty(formValues: any): boolean {
        return Object.values(formValues).every(value => value === null || value === undefined || value === '');
    }
    static minDateMondayOrToday(): Date {
        const hoy = new Date();
        const diaSemana = hoy.getDay(); 
        if (diaSemana === 6) {
            return new Date(hoy.getTime() + 2 * 24 * 60 * 60 * 1000);
        }
        if (diaSemana === 0) {
            return new Date(hoy.getTime() + 24 * 60 * 60 * 1000);
        }
        return hoy;
    }
}


