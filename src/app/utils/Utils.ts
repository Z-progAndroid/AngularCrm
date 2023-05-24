export class Utils {
    static isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined|| value === "";
    }
    static isFormEmpty(formValues: any): boolean {
        return Object.values(formValues).every(value => value === null || value === undefined|| value === '');
    }
}
