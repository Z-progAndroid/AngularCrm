import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cabecera-estados',
  templateUrl: './cabecera-estados.component.html',
  styleUrls: ['./cabecera-estados.component.scss']
})
export class CabeceraEstadosComponent {
  @Input() titulo: string
  @Input() estados: any[]
  constructor() { }
}
