import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { Inmueble } from 'src/app/models/inmueble';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.scss']
})
export class InmuebleComponent extends BaseComponent implements OnInit {
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
    private usuariosService: UsuarioService,
    private fb: FormBuilder,
  ) { super(); }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarDatos();
    this.cargarInmuebles();
  }
  cargarDatos() {
    const observables = [
      this.inmuebleService.findAll(),
      this.barrioservice.findAll(),
      this.estadoInmuebleService.findAll(),
      this.municipioService.findAll(),
      this.paisService.findAll(),
      this.provinciaService.findAll(),
      this.tipoInmuebleService.findAll(),
      this.usuariosService.findAllUserAdminORAgente()
    ];
    forkJoin(observables).subscribe(
      (results: any[]) => {
        this.inmuebles = results[0];
        this.barrios = results[1];
        this.estadosInmueble = results[2];
        this.municipios = results[3];
        this.paises = results[4];
        this.provincias = results[5];
        this.tiposInmueble = results[6];
        this.usuarios = results[7];
      }, (error) => {
        Alerts.error('Error', 'Error al cargar los datos de los select', error);
      });
  }
  busqueda() {
    this.inmuebles = [];
    this.inmuebleService.search(this.formTOInmueble()).subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    }, (error) => {
      Alerts.error('Error', 'Error no se han encontrado inmuebles por los parametros introducidos', error);
    });
  }
  limpiarFiltros() {
    this.buscadorFrom.reset();
    this.buscadorFrom.get('ipPais').setValue('');
    this.buscadorFrom.get('provincia').setValue(0);
    this.buscadorFrom.get('municipio').setValue(0);
    this.buscadorFrom.get('barrio').setValue(0);
    this.buscadorFrom.get('tipoinmueble').setValue(0);
    this.buscadorFrom.get('estadoInmueble').setValue(0);
    this.buscadorFrom.get('idUsuario').setValue(0);
    this.cargarInmuebles();
  }
  crearFormulario() {
    this.buscadorFrom = this.fb.group({
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
      provincia: [0],
      municipio: [0],
      barrio: [0],
      tipoinmueble: [0],
      estadoInmueble: [0],
      idUsuario: [0],
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
    inmueble.metros_cuadrados = this.buscadorFrom.get('metroscuadrados').value;
    inmueble.ano_construccion = this.buscadorFrom.get('anoconstruccion').value;
    inmueble.idTipoInmueble = this.buscadorFrom.get('tipoinmueble').value;
    inmueble.idEstadoInmueble = this.buscadorFrom.get('estadoInmueble').value;
    inmueble.idPais = this.buscadorFrom.get('ipPais').value;
    inmueble.idProvincia = this.buscadorFrom.get('provincia').value;
    inmueble.idMunicipio = this.buscadorFrom.get('municipio').value;
    inmueble.idUsuario = this.buscadorFrom.get('idUsuario').value;
    inmueble.idBarrio = this.buscadorFrom.get('barrio').value;
    return inmueble;
  }
  cargarInmuebles() {
    this.inmuebleService.findAll().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    }, (error) => {
      Alerts.error('Error', 'Error no se han encontrado inmuebles por los parametros introducidos', error);
    });
  }
}
