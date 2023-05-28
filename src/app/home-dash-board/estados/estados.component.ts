import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {
  estadoContratos: boolean
  estadoInmuebles: boolean
  estadoTarea: boolean
  estadoUsuarios: boolean
  estadosCitas: boolean
  estados: any[]
  titulo: string


  constructor() { }
  ngOnInit(): void {
    this.fillEstados()
    this.titulo = "Contratos Estados";

  }
  fillEstados() {
    this.estados = [
      { titulo: 'Contratos Estados', valor: "CE" },
      { titulo: 'Inmuebles Estados', valor: "IE" },
      { titulo: 'Tareas Estados', valor: "TE" },
      { titulo: 'Usuarios Estados', valor: "UE" },
      { titulo: 'Citas Estados', valor: "CE" }
    ]
  }

}
