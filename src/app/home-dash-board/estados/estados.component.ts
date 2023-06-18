import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {
  estadoContratos: boolean = false
  estadoInmuebles: boolean = false
  estadoTarea: boolean = false
  estadoUsuarios: boolean = false
  estadosCitas: boolean = false
  estados: any[]
  titulo: string


  constructor() { }
  ngOnInit(): void {
    this.estadoContratos = true;
    this.titulo = 'Contratos Estados';
    this.fillEstados()
  }
  fillEstados() {
    this.estados = [
      { titulo: 'Contratos Estados', valor: "CE" },
      { titulo: 'Inmuebles Estados', valor: "IE" },
      { titulo: 'Tareas Estados', valor: "TE" },
      { titulo: 'Usuarios Estados', valor: "UE" },
      { titulo: 'Citas Estados', valor: "CIE" }
    ]
  }
  opcionSeleccionada(opcion: string) {
    this.estadoContratos = false;
    this.estadoInmuebles = false;
    this.estadoTarea = false;
    this.estadoUsuarios = false;
    this.estadosCitas = false;
    this.titulo = '';

    if (opcion === 'CE') {
      this.estadoContratos = true;
      this.titulo = 'Contratos Estados';
    } else if (opcion === 'IE') {
      this.estadoInmuebles = true;
      this.titulo = 'Inmuebles Estados';
    } else if (opcion === 'TE') {
      this.estadoTarea = true;
      this.titulo = 'Tareas Estados';
    } else if (opcion === 'UE') {
      this.estadoUsuarios = true;
      this.titulo = 'Usuarios Estados';
    } else if (opcion === 'CIE') {
      this.estadosCitas = true;
      this.titulo = 'Citas Estados';
    }
  }
}
