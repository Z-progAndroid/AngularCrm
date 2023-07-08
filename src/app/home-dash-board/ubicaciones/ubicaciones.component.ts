import { Component } from '@angular/core';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.scss']
})
export class UbicacionesComponent {
  paises: boolean = false
  provincias: boolean = false
  municipios: boolean = false
  barrios: boolean = false
  estados: any[]
  titulo: string


  constructor() { }
  ngOnInit(): void {
    this.paises = true;
    this.titulo = 'Paises';
    this.fillEstados()
  }
  fillEstados() {
    this.estados = [
      { titulo: 'Paises', valor: "P" },
      { titulo: 'Provincias', valor: "PROV" },
      { titulo: 'Municipios', valor: "MUN" },
      { titulo: 'Barrios', valor: "BAR" },
    ]
  }
  opcionSeleccionada(opcion: string) {
    this.paises = false
    this.provincias = false
    this.municipios = false
    this.barrios = false
    this.titulo = '';

    if (opcion === 'P') {
      this.paises = true;
      this.titulo = 'Paises';
    } else if (opcion === 'PROV') {
      this.provincias = true;
      this.titulo = 'Provincias';
    } else if (opcion === 'MUN') {
      this.municipios = true;
      this.titulo = 'Municipios';
    } else if (opcion === 'BAR') {
      this.barrios = true;
      this.titulo = 'Barrios';
    }
  }
}
