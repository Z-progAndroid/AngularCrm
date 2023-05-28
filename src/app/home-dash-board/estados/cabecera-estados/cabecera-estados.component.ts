import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-cabecera-estados',
  templateUrl: './cabecera-estados.component.html',
  styleUrls: ['./cabecera-estados.component.scss']
})
export class CabeceraEstadosComponent {
  @Input() titulo: string
  @Input() estados: any[]
  @Output() opcionSeleccionada: EventEmitter<string> = new EventEmitter<string>(); 
  constructor() { }
  change(opcion: string) {
    console.log(opcion);
    this.opcionSeleccionada.emit(opcion);
  }
}
