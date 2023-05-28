import { Component } from '@angular/core';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent {
  tipoContratos: boolean = false
  tipoInmuebles: boolean = false
  tipoPagos: boolean = false
  tipoSeguimientos: boolean = false
  tiposCitas: boolean = false
  estados: any[]
  titulo: string


  constructor() { }
  ngOnInit(): void {
    this.tipoContratos = true;
    this.titulo = 'Contratos Estados';
    this.fillEstados()
  }
  fillEstados() {
    this.estados = [
      { titulo: 'Tipo Contrato', valor: "TC" },
      { titulo: 'Tipo Inmuebles', valor: "TI" },
      { titulo: 'Tipo Pago', valor: "TP" },
      { titulo: 'Tipo Seguimientos', valor: "TS" },
      { titulo: 'Tipo Citas', valor: "TCI" }
    ]
  }
  opcionSeleccionada(opcion: string) {
    this.tipoContratos=false
    this.tipoInmuebles=false
    this.tipoPagos=false
    this.tipoSeguimientos=false
    this.tiposCitas=false
    this.titulo = '';

    if (opcion === 'TC') {
      this.tipoContratos = true;
      this.titulo = 'Tipo Contrato';
    } else if (opcion === 'TI') {
      this.tipoInmuebles = true;
      this.titulo = 'Tipo Inmuebles';
    } else if (opcion === 'TP') {
      this.tipoPagos = true;
      this.titulo = 'Tipo Pago';
    } else if (opcion === 'TS') {
      this.tipoSeguimientos = true;
      this.titulo = 'Tipo Seguimientos';
    } else if (opcion === 'TCI') {
      this.tiposCitas = true;
      this.titulo = 'Tipo Citas';
    }
  }
}
