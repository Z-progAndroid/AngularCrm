import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Barrio } from 'src/app/models/barrio';
import { Inmueble } from 'src/app/models/inmueble';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { BarrioService } from 'src/app/services/barrio.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends BaseComponent implements OnInit {
  @Output() filter: EventEmitter<Inmueble> = new EventEmitter();
  tiposInmuebles: TipoInmueble[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  municipios: Municipo[] = [];
  barrios: Barrio[] = [];
  filterForm: FormGroup;
  constructor(
    private tipoInmuebleService: TipoInmuebleService,
    private paisService: PaisService,
    private provinciasService: ProvinciaService,
    private municipioService: MunicipioService,
    private barrioService: BarrioService,
    private fb: FormBuilder,
  ) { super(); }
  ngOnInit(): void {
    this.cargarDatos();
    this.cargarTiposInmuebles();
    this.crearFormulario();
  }
  cargarDatos() {
    this.barrioService.findAll().subscribe((barrios: Barrio[]) => {
      this.barrios = barrios;
    }, error => Alerts.error('Error', 'Error al cargar los barrios', error));
    this.municipioService.findAll().subscribe((municipios: Municipo[]) => {
      this.municipios = municipios;
    }, error => Alerts.error('Error', 'Error al cargar los municipios', error));
    this.paisService.findAll().subscribe((paises: Pais[]) => {
      this.paises = paises;
    }, error => Alerts.error('Error', 'Error al cargar los paises', error));
    this.provinciasService.findAll().subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    }, error => Alerts.error('Error', 'Error al cargar las provincias', error));
    this.tipoInmuebleService.findAll().subscribe((tipoInmuebles: TipoInmueble[]) => {
      this.tiposInmuebles = tipoInmuebles;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de inmueble', error));
  }
  changePais(pais: string) {
    this.provincias = [];
    if (pais === 'Seleciona una opción' || pais === '') {
      return;
    }
    this.provinciasService.findAllByIdPais(pais).subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    }, error => Alerts.error('Error', 'Error al cargar las provincias', error));
  }

  changeProvincia(idProvincia: String) {
    this.municipios = [];
    if (idProvincia === 'Seleciona una opción' || idProvincia === '') {
      return;
    }
    this.municipioService.findAllByProvincia(idProvincia).subscribe((municipios: Municipo[]) => {
      this.municipios = municipios;
    }, error => Alerts.error('Error', 'Error al cargar los municipios', error));
  }
  changeMunicipio(idMunicipio: String) {
    this.barrios = [];
    if (idMunicipio === 'Seleciona una opción' || idMunicipio === '') {
      return;
    }
    this.barrioService.findAllByMunicipio(idMunicipio).subscribe((barrios: Barrio[]) => {
      this.barrios = barrios;
    }, error => Alerts.error('Error', 'Error al cargar los barrios', error));
  }
  cargarTiposInmuebles() {
    this.tipoInmuebleService.findAll().subscribe(data => {
      this.tiposInmuebles = data;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de inmuebles', error));
  }
  crearFormulario() {
    this.filterForm = this.fb.group({
      precioVenta: [''],
      precioAquiler: [''],
      numeroHabitaciones: [''],
      numeroBanos: [''],
      metrosCuadrados: [''],
      tiposInmueble: [0],
      pais: [''],
      provincia: [0],
      municipio: [0],
      barrio: [0],
    });
  }
  resetForm() {
    this.filterForm.reset();
    this.filterForm.controls['pais'].setValue('');
    this.filterForm.controls['tiposInmueble'].setValue(0);
    this.filterForm.controls['provincia'].setValue(0);
    this.filterForm.controls['municipio'].setValue(0);
    this.filterForm.controls['barrio'].setValue(0);
  }
  buscar() {
    let inmueble = new Inmueble();
    inmueble.precio_venta = this.filterForm.controls['precioVenta'].value==''?0:this.filterForm.controls['precioVenta'].value;
    inmueble.precio_alquiler = this.filterForm.controls['precioAquiler'].value==''?0:this.filterForm.controls['precioAquiler'].value;
    inmueble.numHabitaciones = this.filterForm.controls['numeroHabitaciones'].value==''?0:this.filterForm.controls['numeroHabitaciones'].value;
    inmueble.numBanos = this.filterForm.controls['numeroBanos'].value==''?0:this.filterForm.controls['numeroBanos'].value;
    inmueble.metros_cuadrados = this.filterForm.controls['metrosCuadrados'].value==''?0:this.filterForm.controls['metrosCuadrados'].value;
    inmueble.idTipoInmueble = this.filterForm.controls['tiposInmueble'].value==''?0:this.filterForm.controls['tiposInmueble'].value;
    inmueble.idPais = this.filterForm.controls['pais'].value;
    inmueble.idProvincia = this.filterForm.controls['provincia'].value==''?0:this.filterForm.controls['provincia'].value;
    inmueble.idMunicipio = this.filterForm.controls['municipio'].value==''?0:this.filterForm.controls['municipio'].value;
    inmueble.idBarrio = this.filterForm.controls['barrio'].value==''?0:this.filterForm.controls['barrio'].value;
    inmueble.idEstadoInmueble = 1;
    this.filter.emit(inmueble);
  }
}
