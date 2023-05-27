import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { error } from 'console';
import { forkJoin } from 'rxjs';
import { Barrio } from 'src/app/models/barrio';
import { EstadoInmueble } from 'src/app/models/estado-inmueble';
import { Imagen } from 'src/app/models/imagen';
import { Inmueble } from 'src/app/models/inmueble';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { User } from 'src/app/models/user';
import { BarrioService } from 'src/app/services/barrio.service';
import { EstadoInmuebleService } from 'src/app/services/estado-inmueble.service';
import { ImagenServiceService } from 'src/app/services/imagen-service.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inmueble-detail',
  templateUrl: './inmueble-detail.component.html',
  styleUrls: ['./inmueble-detail.component.scss']
})
export class InmuebleDetailComponent implements OnInit {
  inmuebleForm: FormGroup;
  botonSave: boolean = false;
  prametosRuta: Params;
  imagenes: Imagen[] = [];
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
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private imagenService: ImagenServiceService
  ) {
    this.inmuebleForm = this.iniciarFormulario();
  }
  ngOnInit(): void {
    forkJoin([
      this.estadoInmuebleService.findAll(),
      this.paisService.findAll(),
      this.tipoInmuebleService.findAll(),
      this.usuaruioService.findAllUserAdminORAgente()
    ]).subscribe(
      ([estadosInmueble, paises, tiposInmueble, usuarios]) => {
        this.estadosInmueble = estadosInmueble;
        this.paises = paises;
        this.tiposInmueble = tiposInmueble;
        this.usuarios = usuarios;
      }, error => console.log(error));
    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    this.realizarAccion(url);
  }

  onSubmit() {
    this.inmuebleService.save(this.fromToInmueble()).subscribe((inmueble: Inmueble) => {
        this.uploadImagnes(inmueble.idInmueble.toString());
      }, error => console.log(error));
  }
  changePais(pais: string) {
    this.provincias = [];
    if (pais === 'Seleciona una opción' || pais === '') {
      return;
    }
    this.provinciaService.findAllByIdPais(pais).subscribe(
      (provincias: Provincia[]) => {
        this.provincias = provincias;
      },
      error => console.log(error)
    );
  }

  changeProvincia(idProvincia: String) {
    this.municipios = [];
    if (idProvincia === 'Seleciona una opción' || idProvincia === '') {
      return;
    }
    this.municipioService.findAllByProvincia(idProvincia).subscribe(
      (municipios: Municipo[]) => {
        this.municipios = municipios;
      },
      error => console.log(error)
    );
  }
  changeMunicipio(idMunicipio: String) {
    this.barrios = [];
    if (idMunicipio === 'Seleciona una opción' || idMunicipio === '') {
      return;
    }
    this.barrioservice.findAllByMunicipio(idMunicipio).subscribe(
      (barrios: Barrio[]) => {
        this.barrios = barrios;
      },
      error => console.log(error)
    );
  }


  iniciarFormulario(): FormGroup {
    return this.fb.group({
      precioventa: ['', Validators.required],
      precioalquiler: ['', Validators.required],
      numHabitaciones: ['', Validators.required],
      numBanos: ['', Validators.required],
      metroscuadrados: ['', Validators.required],
      anoconstruccion: ['', [Validators.required, CustomValidators.yearValidator()]],
      direccion: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      idTipoInmueble: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idEstadoInmueble: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idUsuario: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idPais: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idProvincia: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idMunicipio: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idBarrio: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      descripcion: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      idInmueble: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
      img1text: [''],
      img2text: [''],
      img3text: [''],
      img4text: [''],
      modificado: ['']
    });
  }
  fromToInmueble(): Inmueble {
    let inmueble: Inmueble = new Inmueble();
    inmueble.precio_venta = this.inmuebleForm.get('precioventa').value;
    inmueble.precio_alquiler = this.inmuebleForm.get('precioalquiler').value;
    inmueble.numHabitaciones = this.inmuebleForm.get('numHabitaciones').value;
    inmueble.numBanos = this.inmuebleForm.get('numBanos').value;
    inmueble.metros_cuadrados = this.inmuebleForm.get('metroscuadrados').value;
    inmueble.ano_construccion = this.inmuebleForm.get('anoconstruccion').value;
    inmueble.direccion = this.inmuebleForm.get('direccion').value;
    inmueble.codigoPostal = this.inmuebleForm.get('codigoPostal').value;
    inmueble.idTipoInmueble = this.inmuebleForm.get('idTipoInmueble').value;
    inmueble.idEstadoInmueble = this.inmuebleForm.get('idEstadoInmueble').value;
    inmueble.idUsuario = this.inmuebleForm.get('idUsuario').value;
    inmueble.idPais = this.inmuebleForm.get('idPais').value;
    inmueble.idProvincia = this.inmuebleForm.get('idProvincia').value;
    inmueble.idMunicipio = this.inmuebleForm.get('idMunicipio').value;
    inmueble.idBarrio = this.inmuebleForm.get('idBarrio').value;
    inmueble.descripcion = this.inmuebleForm.get('descripcion').value;
    inmueble.idInmueble = this.inmuebleForm.get('idInmueble').value;
    inmueble.imagen1 = this.inmuebleForm.get('img1text').value;
    inmueble.imagen2 = this.inmuebleForm.get('img2text').value;
    inmueble.imagen3 = this.inmuebleForm.get('img3text').value;
    inmueble.imagen4 = this.inmuebleForm.get('img4text').value;
    inmueble.fechaCreacion = Utils.isNullOrUndefined(this.inmuebleForm.get('fechaCreacion').value) ? new Date() : this.inmuebleForm.get('fechaCreacion').value;
    inmueble.fechaModificacion = Utils.isNullOrUndefined(this.inmuebleForm.get('fechaModificacion').value) ? new Date() : this.inmuebleForm.get('fechaModificacion').value;
    inmueble.modificado = this.inmuebleForm.get('modificado').value === '' ? 'N' : this.inmuebleForm.get('modificado').value;
    inmueble = this.setImgagenes(inmueble);
    return inmueble;
  }
  setImgagenes(inmueble: Inmueble): Inmueble {
    const img1: HTMLInputElement = document.getElementById('img1') as HTMLInputElement;
    const img2: HTMLInputElement = document.getElementById('img2') as HTMLInputElement;
    const img3: HTMLInputElement = document.getElementById('img3') as HTMLInputElement;
    const img4: HTMLInputElement = document.getElementById('img4') as HTMLInputElement;
    const file1 = img1.files[0];
    const file2 = img2.files[0];
    const file3 = img3.files[0];
    const file4 = img4.files[0];
    if (!Utils.isNullOrUndefined(file1)) {
      inmueble.imagen1 = file1.name;
    }
    if (!Utils.isNullOrUndefined(file2)) {
      inmueble.imagen2 = file2.name;
    }
    if (!Utils.isNullOrUndefined(file3)) {
      inmueble.imagen3 = file3.name;
    }
    if (!Utils.isNullOrUndefined(file4)) {
      inmueble.imagen4 = file4.name;
    }
    return inmueble;
  }
  uploadImagnes(idInmueble: string) {
    const img1: HTMLInputElement = document.getElementById('img1') as HTMLInputElement;
    const img2: HTMLInputElement = document.getElementById('img2') as HTMLInputElement;
    const img3: HTMLInputElement = document.getElementById('img3') as HTMLInputElement;
    const img4: HTMLInputElement = document.getElementById('img4') as HTMLInputElement;
    let formDataimg1 = new FormData();
    let formDataimg2 = new FormData();
    let formDataimg3 = new FormData();
    let formDataimg4 = new FormData();

    if (!Utils.isNullOrUndefined(img1.files[0])) {
      formDataimg1.append('file', img1.files[0]);
      this.imagenService.saveImage(formDataimg1, idInmueble)
        .subscribe((data) => { console.log(data); });
    }
    if (!Utils.isNullOrUndefined(img2.files[0])) {
      formDataimg2.append('file', img2.files[0]);
      this.imagenService.saveImage(formDataimg2, idInmueble)
        .subscribe((data) => { console.log(data); });
    }
    if (!Utils.isNullOrUndefined(img3.files[0])) {
      formDataimg3.append('file', img3.files[0]);
      this.imagenService.saveImage(formDataimg3, idInmueble)
        .subscribe((data) => { console.log(data); });
    }
    if (!Utils.isNullOrUndefined(img4.files[0])) {
      formDataimg4.append('file', img4.files[0]);
      this.imagenService.saveImage(formDataimg4, idInmueble)
        .subscribe((data) => { console.log(data); });
    }
    this.router.navigate(['/inmueble']);
  }
  realizarAccion(url: String) {
    if (url.includes('crear')) {
      return;
    }
    this.barrios = []
    this.estadosInmueble = []
    this.municipios = []
    this.provincias = []
    this.tiposInmueble = []
    this.usuarios = []
    forkJoin(
      this.barrioservice.findAll(),
      this.estadoInmuebleService.findAll(),
      this.municipioService.findAll(),
      this.paisService.findAll(),
      this.provinciaService.findAll(),
      this.tipoInmuebleService.findAll(),
      this.usuaruioService.findAllUserAdminORAgente())
      .subscribe(([barrios, estadoInmuebles, municipios, paises, provincias, tipoInmuebles, usuarios]) => {
        this.barrios = barrios;
        this.estadosInmueble = estadoInmuebles;
        this.municipios = municipios;
        this.paises = paises
        this.provincias = provincias
        this.tiposInmueble = tipoInmuebles
        this.usuarios = usuarios;
      });
    this.cargarImueble();
    if (url.includes('ver')) {
      this.inmuebleForm.disable();
      this.botonSave = true;
      this.inmuebleForm.get('img1').disable();
      this.inmuebleForm.get('img2').disable();
      this.inmuebleForm.get('img3').disable();
      this.inmuebleForm.get('img4').disable();
    }

  }
  deshabilitar() {
    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    if (url.includes('ver')) {
      return;
    }
    Utils.isNullOrUndefined(this.inmuebleForm.get('img1text').value) ?
      this.inmuebleForm.get('img1').enable() : this.inmuebleForm.get('img1').disable();
    Utils.isNullOrUndefined(this.inmuebleForm.get('img2text').value) ?
      this.inmuebleForm.get('img2').enable() : this.inmuebleForm.get('img2').disable();
    Utils.isNullOrUndefined(this.inmuebleForm.get('img3text').value) ?
      this.inmuebleForm.get('img3').enable() : this.inmuebleForm.get('img3').disable();
    Utils.isNullOrUndefined(this.inmuebleForm.get('img4text').value) ?
      this.inmuebleForm.get('img4').enable() : this.inmuebleForm.get('img4').disable();
  }
  deleteImagen(idImagen: number) {
    let nombreImagen = this.inmuebleForm.get('img' + idImagen + 'text').value;
    this.inmuebleForm.get('img' + idImagen + 'text').setValue(null);
    let idInmueble = this.rutaActiva.snapshot.params['id'];
    this.imagenService.deleteImagen(nombreImagen, idInmueble).subscribe((data) => {
      this.cargarImueble();
    }), (error) => {
      console.log(error);
    };
  }
  cargarImueble() {
    this.imagenes = []
    let id = this.rutaActiva.snapshot.params['id'];
    this.inmuebleService.findById(id).subscribe((inmueble: Inmueble) => {
      this.inmuebleForm.get('precioventa').setValue(inmueble.precio_venta)
      this.inmuebleForm.get('precioalquiler').setValue(inmueble.precio_alquiler)
      this.inmuebleForm.get('numHabitaciones').setValue(inmueble.numHabitaciones)
      this.inmuebleForm.get('numBanos').setValue(inmueble.numBanos)
      this.inmuebleForm.get('metroscuadrados').setValue(inmueble.metros_cuadrados)
      this.inmuebleForm.get('anoconstruccion').setValue(inmueble.ano_construccion)
      this.inmuebleForm.get('direccion').setValue(inmueble.direccion)
      this.inmuebleForm.get('codigoPostal').setValue(inmueble.codigoPostal)
      this.inmuebleForm.get('idTipoInmueble').setValue(inmueble.idTipoInmueble)
      this.inmuebleForm.get('idEstadoInmueble').setValue(inmueble.idEstadoInmueble)
      this.inmuebleForm.get('idUsuario').setValue(inmueble.idUsuario)
      this.inmuebleForm.get('idPais').setValue(inmueble.idPais)
      this.inmuebleForm.get('idProvincia').setValue(inmueble.idProvincia)
      this.inmuebleForm.get('idMunicipio').setValue(inmueble.idMunicipio)
      this.inmuebleForm.get('idBarrio').setValue(inmueble.idBarrio)
      this.inmuebleForm.get('descripcion').setValue(inmueble.descripcion)
      this.inmuebleForm.get('idInmueble').setValue(inmueble.idInmueble)
      this.inmuebleForm.get('fechaCreacion').setValue(inmueble.fechaCreacion)
      this.inmuebleForm.get('fechaModificacion').setValue(inmueble.fechaModificacion)
      this.inmuebleForm.get('modificado').setValue(inmueble.modificado)
      this.inmuebleForm.get('img1text').setValue(inmueble.imagen1)
      this.inmuebleForm.get('img2text').setValue(inmueble.imagen2)
      this.inmuebleForm.get('img3text').setValue(inmueble.imagen3)
      this.inmuebleForm.get('img4text').setValue(inmueble.imagen4)
      if (!Utils.isNullOrUndefined(inmueble.imagen1)) {
        this.imagenService.getImage(inmueble.imagen1, inmueble.idInmueble.toString()).subscribe((data) => {
          let imagen = new Imagen();
          imagen.idImagen = 1;
          imagen.contenido = URL.createObjectURL(data.body);
          this.imagenes.push(imagen);
        });
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen2)) {
        this.imagenService.getImage(inmueble.imagen2, inmueble.idInmueble.toString()).subscribe((data) => {
          let imagen = new Imagen();
          imagen.idImagen = 2;
          imagen.contenido = URL.createObjectURL(data.body);
          this.imagenes.push(imagen);

        });
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen3)) {
        this.imagenService.getImage(inmueble.imagen3, inmueble.idInmueble.toString()).subscribe((data) => {
          let imagen = new Imagen();
          imagen.idImagen = 3;
          imagen.contenido = URL.createObjectURL(data.body);
          this.imagenes.push(imagen);
        });
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen4)) {
        this.imagenService.getImage(inmueble.imagen4, inmueble.idInmueble.toString()).subscribe((data) => {
          let imagen = new Imagen();
          imagen.idImagen = 4;
          imagen.contenido = URL.createObjectURL(data.body);
          this.imagenes.push(imagen);
        });
      }

    });
  }
}