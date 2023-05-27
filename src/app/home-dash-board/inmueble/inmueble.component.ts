import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Barrio } from 'src/app/models/barrio';
import { EstadoInmueble } from 'src/app/models/estado-inmueble';

import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { User } from 'src/app/models/user';
import { BarrioService } from 'src/app/services/barrio.service';
import { EstadoInmuebleService } from 'src/app/services/estado-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { forkJoin } from 'rxjs';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImagenServiceService } from 'src/app/services/imagen-service.service';
import { Inmueble } from 'src/app/models/inmueble';
@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.scss']
})
export class InmuebleComponent implements OnInit {
  buscadorFrom: FormGroup;
  inmuebles: Inmueble[] = [];
  botonSave: boolean = false;
  barrios: Barrio[] = [];
  estadosInmueble: EstadoInmueble[] = [];
  municipios: Municipo[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  tiposInmueble: TipoInmueble[] = [];
  usuarios: User[] = [];
  constructor(
    private inmuebleService: InmuebleService,
    private barrioservice: BarrioService,
    private estadoInmuebleService: EstadoInmuebleService,
    private municipioService: MunicipioService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private tipoInmuebleService: TipoInmuebleService,
    private usuaruioService: UsuarioService,
    private fb: FormBuilder,
  ) {
    this.buscadorFrom = this.iniciarFormulario();
  }
  ngOnInit(): void {

    forkJoin([
      this.estadoInmuebleService.findAll(),
      this.paisService.findAll(),
      this.tipoInmuebleService.findAll(),
      this.usuaruioService.findAllUserAdminORAgente(),
      this.barrioservice.findAll(),
      this.estadoInmuebleService.findAll(),
      this.municipioService.findAll(),
      this.provinciaService.findAll(),
      this.tipoInmuebleService.findAll(),
    ]).subscribe(
      ([estadosInmueble, paises, tiposInmueble, usuarios,barrio,estado,municipio,provincia]) => {
        this.estadosInmueble = estadosInmueble;
        this.paises = paises;
        this.tiposInmueble = tiposInmueble;
        this.usuarios = usuarios;
        this.barrios = barrio;
        this.municipios = municipio;
        this.provincias = provincia;
        
      }, error => console.log(error));
    this.inmuebleService.findAll().subscribe((data: Inmueble[]) => {
      this.inmuebles = data;
    });
  }
  busqueda() {
    this.inmuebles = [];
    this.inmuebleService.search(this.formTOInmueble()).subscribe(
      (inmuebles: Inmueble[]) => {
        this.inmuebles = inmuebles;
      });
  }
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      idInmueble: [''],
      descripcion: [''],
      direccion: [''],
      codigoPostal: [''],
      precioventa: [''],
      precioalquiler: [''],
      numHabitaciones: [''],
      numBanos: [''],
      metroscuadrados: [''],
      anoconstruccion: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
      ipPais: [''],
      provincia: [''],
      municipio: [''],
      barrio: [''],
      tipoinmueble: [''],
      estadoInmueble: [''],
      idUsuario: [''],
    });
  }
  formTOInmueble(): Inmueble {
    let inmueble = new Inmueble();
    inmueble.idInmueble = this.buscadorFrom.get('idInmueble').value;
    inmueble.descripcion = this.buscadorFrom.get('descripcion').value;
    inmueble.direccion = this.buscadorFrom.get('direccion').value;
    inmueble.codigoPostal = this.buscadorFrom.get('codigoPostal').value;
    inmueble.precio_venta = this.buscadorFrom.get('precioventa').value;
    inmueble.precio_alquiler = this.buscadorFrom.get('precioalquiler').value;
    inmueble.numHabitaciones = this.buscadorFrom.get('numHabitaciones').value;
    inmueble.numBanos = this.buscadorFrom.get('numBanos').value;
    inmueble.ano_construccion = this.buscadorFrom.get('anoconstruccion').value;
    inmueble.metros_cuadrados = this.buscadorFrom.get('metroscuadrados').value;
    inmueble.idPais = this.buscadorFrom.get('ipPais').value;
    inmueble.provincia = this.buscadorFrom.get('provincia').value;
    inmueble.municipio = this.buscadorFrom.get('municipio').value;
    inmueble.barrio = this.buscadorFrom.get('barrio').value;
    inmueble.tipoInmueble = this.buscadorFrom.get('tipoinmueble').value;
    inmueble.estadoInmueble = this.buscadorFrom.get('estadoInmueble').value;
    inmueble.idUsuario = this.buscadorFrom.get('idUsuario').value;
    return inmueble;
  }
}
