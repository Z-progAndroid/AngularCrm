import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera-tipos',
  templateUrl: './cabecera-tipos.component.html',
  styleUrls: ['./cabecera-tipos.component.scss']
})
export class CabeceraTiposComponent {
  @Input() titulo: string
  @Input() estados: any[]
  @Output() opcionSeleccionada: EventEmitter<string> = new EventEmitter<string>(); 
  constructor() { }
  change(opcion: string) {
    this.opcionSeleccionada.emit(opcion);
  }
}
