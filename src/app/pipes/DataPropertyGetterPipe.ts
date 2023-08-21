import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    if (keyName && keyName.includes('fecha')) {
      return this.datePipe.transform(object[keyName], 'dd/MM/yyyy');
    }
    return object[keyName];
  }

}