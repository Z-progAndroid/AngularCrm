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
import { Inmueble } from 'src/app/models/inmueble';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { TableColumn } from 'src/app/interfaces/table-column';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/Utils';
import { AuthService } from 'src/app/services/auth.service';
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
  isAgente: boolean = this.authService.isAgent() ? true : false;
  tableColumns: TableColumn[] = [
    { name: 'Direccion', dataKey: 'direccion' },
    { name: 'Precio Venta', dataKey: 'precio_venta' },
    { name: 'Precio Alquiler', dataKey: 'precio_alquiler' },
    { name: 'Tipo Inmueble', dataKey: 'tipoInmueble' },
    { name: 'Estado Inmueble', dataKey: 'estadoInmueble' }
  ];
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
    private router: Router,
    private authService: AuthService
  ) { super(); }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarDatos();
    this.cargarInmuebles();
  }
  cargarDatos() {
    this.barrioservice.findAll().subscribe(barrios => {
      this.barrios = barrios;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.estadoInmuebleService.findAll().subscribe(estadosInmueble => {
      this.estadosInmueble = estadosInmueble;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.municipioService.findAll().subscribe(municipios => {
      this.municipios = municipios;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.paisService.findAll().subscribe(paises => {
      this.paises = paises;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.provinciaService.findAll().subscribe(provincias => {
      this.provincias = provincias;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.tipoInmuebleService.findAll().subscribe(tiposInmueble => {
      this.tiposInmueble = tiposInmueble;
    }, (error) => {
      Alerts.error('Error', 'Error al cargar los datos de los select', error);
    });
    this.usuariosService.findAllClientes().subscribe(usuarios => {
      this.usuarios = usuarios;
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
    inmueble.idUsuario = this.authService.isAdmin()
      ? this.buscadorFrom.get('idUsuario').value
      : this.authService.getIdUsuario();
    inmueble.idBarrio = this.buscadorFrom.get('barrio').value;
    inmueble.noEliminado = this.authService.isAgent() ? true : false
    return inmueble;
  }
  cargarInmuebles() {
    if (this.authService.isAdmin()) {
      this.inmuebleService.findAllSinRelaciones().subscribe(inmuebles => {
        this.inmuebles = inmuebles;
      }, (error) => {
        Alerts.error('Error', 'Error al cargar los inmuebles', error);
      });
      return;
    }
    if (this.authService.isAgent()) {
      this.inmuebleService.obtenerInmueblesPorUsuario(this.authService.getIdUsuario()).subscribe(inmuebles => {
        this.inmuebles = inmuebles;
      }, (error) => {
        Alerts.error('Error', 'Error al cargar los inmuebles', error);
      });
      return;
    }
  }
  delete($event) {
    Alerts.warning('Advertencia', 'el inmueble se eliminara de forma permanente con todos sus datos asociados', 'si,eliminar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Informacion', 'Operacion cancelada por el usuario');
        return;
      }
      this.inmuebleService.delete($event.idInmueble).subscribe(() => {
        Alerts.success('Exito', 'Inmueble eliminado correctamente');
        this.cargarInmuebles();
      }, (error) => {
        Alerts.error('Error', 'Error al eliminar el inmueble', error);
      });
    });
  }
  export($event) {
    this.inmuebleService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'inmuebles.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los inmuebles', error);
    });
  }
  edit($event) {
    this.router.navigate(['/home-dashboard/inmueble/editar/', $event.idInmueble]);
  }
}
