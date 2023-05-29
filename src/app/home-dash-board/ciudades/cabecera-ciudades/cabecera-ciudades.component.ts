import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera-ciudades',
  templateUrl: './cabecera-ciudades.component.html',
  styleUrls: ['./cabecera-ciudades.component.scss']
})
export class CabeceraCiudadesComponent {
  @Input() titulo: string
  @Input() estados: any[]
  @Output() opcionSeleccionada: EventEmitter<string> = new EventEmitter<string>(); 
  constructor() { }
  change(opcion: string) {
    this.opcionSeleccionada.emit(opcion);
  }
}
