import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Barrio } from 'src/app/models/barrio';
import { EstadoInmueble } from 'src/app/models/estado-inmueble';
import { Inmueble } from 'src/app/models/inmueble';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { EstadoInmuebleService } from 'src/app/services/estado-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
@Component({
  selector: 'app-inmueble-detail',
  templateUrl: './inmueble-detail.component.html',
  styleUrls: ['./inmueble-detail.component.scss']
})
export class InmuebleDetailComponent extends BaseComponent implements OnInit {
  inmuebleForm: FormGroup;
  botonSave: boolean = false;
  prametosRuta: Params;
  imagenes: SafeUrl[] = [];
  imagenesUnit8Array: Uint8Array[] = [];
  barrios: Barrio[] = [];
  estadosInmueble: EstadoInmueble[] = [];
  municipios: Municipo[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  tiposInmueble: TipoInmueble[] = [];
  usuarios: User[] = [];
  hayImg1: boolean = false;
  hayImg2: boolean = false;
  hayImg3: boolean = false;
  hayImg4: boolean = false;
  http: any;
  constructor(
    private inmuebleService: InmuebleService,
    private barrioservice: BarrioService,
    private estadoInmuebleService: EstadoInmuebleService,
    private municipioService: MunicipioService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private tipoInmuebleService: TipoInmuebleService,
    private usuarioService: UsuarioService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {
    super();
    this.inmuebleForm = this.iniciarFormulario();
  }
  ngOnInit(): void {
    this.cargarDatos();
    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    if (url.includes('inmueble/crear')) { return; }
    this.cargarImueble();
  }
  cargarDatos() {
    this.barrioservice.findAll().subscribe((barrios: Barrio[]) => {
      this.barrios = barrios;
    }, error => Alerts.error('Error', 'Error al cargar los barrios', error));
    this.estadoInmuebleService.findAll().subscribe((estadoInmuebles: EstadoInmueble[]) => {
      this.estadosInmueble = estadoInmuebles;
    }, error => Alerts.error('Error', 'Error al cargar los estados de inmueble', error));
    this.municipioService.findAll().subscribe((municipios: Municipo[]) => {
      this.municipios = municipios;
    }, error => Alerts.error('Error', 'Error al cargar los municipios', error));
    this.paisService.findAll().subscribe((paises: Pais[]) => {
      this.paises = paises;
    }, error => Alerts.error('Error', 'Error al cargar los paises', error));
    this.provinciaService.findAll().subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    }, error => Alerts.error('Error', 'Error al cargar las provincias', error));
    this.tipoInmuebleService.findAll().subscribe((tipoInmuebles: TipoInmueble[]) => {
      this.tiposInmueble = tipoInmuebles;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de inmueble', error));
    this.usuarioService.findAllUserAdminORAgente().subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
    }, error => Alerts.error('Error', 'Error al cargar los usuarios', error));
  }

  onSubmit() {
    this.inmuebleService.save(this.fromToInmueble()).subscribe((inmueble: Inmueble) => {
      this.uploadImagenes(inmueble.idInmueble.toString());
    }, error => Alerts.error('Error', 'Error al guardar el inmueble', error));
  }
  changePais(pais: string) {
    this.provincias = [];
    if (pais === 'Seleciona una opción' || pais === '') {
      return;
    }
    this.provinciaService.findAllByIdPais(pais).subscribe((provincias: Provincia[]) => {
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
    this.barrioservice.findAllByMunicipio(idMunicipio).subscribe((barrios: Barrio[]) => {
      this.barrios = barrios;
    }, error => Alerts.error('Error', 'Error al cargar los barrios', error));
  }


  iniciarFormulario(): FormGroup {
    return this.fb.group({
      precioventa: ['', Validators.required],
      precioalquiler: ['', Validators.required],
      numHabitaciones: [''],
      numBanos: [''],
      metroscuadrados: ['', Validators.required],
      anoconstruccion: ['', [Validators.required, CustomValidators.yearValidator()]],
      direccion: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      idTipoInmueble: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idEstadoInmueble: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idUsuario: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idPais: ['', [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idProvincia: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idMunicipio: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      idBarrio: [0, [Validators.required, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      descripcion: [''],
      img1: ['', Validators.required],
      img2: [''],
      img3: [''],
      img4: [''],
      idInmueble: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
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
    inmueble.fechaCreacion = Utils.isNullOrUndefined(this.inmuebleForm.get('fechaCreacion').value) ? new Date() : this.inmuebleForm.get('fechaCreacion').value;
    inmueble.fechaModificacion = new Date();
    inmueble.modificado = this.authService.getUsername();;
    inmueble.imagen1 = Utils.isNullOrUndefined(this.imagenesUnit8Array[0]) ? null : this.imagenesUnit8Array[0];
    inmueble.imagen2 = Utils.isNullOrUndefined(this.imagenesUnit8Array[1]) ? null : this.imagenesUnit8Array[1];
    inmueble.imagen3 = Utils.isNullOrUndefined(this.imagenesUnit8Array[2]) ? null : this.imagenesUnit8Array[2];
    inmueble.imagen4 = Utils.isNullOrUndefined(this.imagenesUnit8Array[3]) ? null : this.imagenesUnit8Array[3];
    return inmueble;
  }
  uploadImagenes(idInmueble: string) {
    const img1: HTMLInputElement = document.getElementById('img1') as HTMLInputElement;
    const img2: HTMLInputElement = document.getElementById('img2') as HTMLInputElement;
    const img3: HTMLInputElement = document.getElementById('img3') as HTMLInputElement;
    const img4: HTMLInputElement = document.getElementById('img4') as HTMLInputElement;
    let formDataimg1 = new FormData();
    let formDataimg2 = new FormData();
    let formDataimg3 = new FormData();
    let formDataimg4 = new FormData();

    if (!Utils.isNullOrUndefined(img1) && !Utils.isNullOrUndefined(img1.files[0])) {
      formDataimg1.append('file', img1.files[0]);
      this.inmuebleService.saveImage(formDataimg1, idInmueble, "1").subscribe((data) => {
      }, error => Alerts.error('Error', 'Error al guardar la portada', error));
    }
    if (!Utils.isNullOrUndefined(img2) && !Utils.isNullOrUndefined(img2.files[0])) {
      formDataimg2.append('file', img2.files[0]);
      this.inmuebleService.saveImage(formDataimg2, idInmueble, "2").subscribe((data) => {
      }, error => Alerts.error('Error', 'Error al guardar la segunda imagen', error));
    }
    if (!Utils.isNullOrUndefined(img3) && !Utils.isNullOrUndefined(img3.files[0])) {
      formDataimg3.append('file', img3.files[0]);
      this.inmuebleService.saveImage(formDataimg3, idInmueble, "3").subscribe((data) => {
      }, error => Alerts.error('Error', 'Error al guardar la tercera imagen', error));
    }
    if (!Utils.isNullOrUndefined(img4) && !Utils.isNullOrUndefined(img4.files[0])) {
      formDataimg4.append('file', img4.files[0]);
      this.inmuebleService.saveImage(formDataimg4, idInmueble, "4").subscribe((data) => {
      }, error => Alerts.error('Error', 'Error al guardar la cuarta imagen', error));
    }

    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    if (url.includes('crear')) {
      Alerts.success('Inmueble', 'Inmueble guardado correctamente');
      this.router.navigate(['/home-dashboard/inmueble']);
      return;
    }
    Alerts.success('Inmueble', 'Inmueble actualizado correctamente');
    setTimeout(() => {
      this.cargarImueble();
    }, 300);
  }
  deleteImagen(idImagen: number, idInmueble: number) {
    this.imagenesUnit8Array[idImagen - 1] = null;
    const idImagenMap = {
      1: 'hayImg1',
      2: 'hayImg2',
      3: 'hayImg3',
      4: 'hayImg4'
    };
    if (idImagen == 1) {
      this.inmuebleForm.get('img1').setValidators([Validators.required]);
      this.inmuebleForm.get('img1').updateValueAndValidity();
    }
    if (idImagen in idImagenMap) {
      this[idImagenMap[idImagen]] = false;
    }
    this.inmuebleService.deleteImage(idInmueble.toString(), idImagen.toString()).subscribe((data) => {
      Alerts.success('Imagen', 'Imagen eliminada correctamente');
      this.cargarImueble();
    });
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
      this.inmuebleForm.get('modificado').setValue(inmueble.modificado)
      if (!Utils.isNullOrUndefined(inmueble.imagen1)) {
        this.hayImg1 = true;
        this.imagenesUnit8Array[0] = inmueble.imagen1;
        this.imagenes[0] = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen1);
        this.inmuebleForm.get('img1').setValidators([]);
        this.inmuebleForm.get('img1').updateValueAndValidity();
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen2)) {
        this.hayImg2 = true;
        this.imagenesUnit8Array[1] = inmueble.imagen2;
        this.imagenes[1] = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen2);
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen3)) {
        this.hayImg3 = true;
        this.imagenesUnit8Array[2] = inmueble.imagen3;
        this.imagenes[2] = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen3);
      }
      if (!Utils.isNullOrUndefined(inmueble.imagen4)) {
        this.hayImg4 = true;
        this.imagenesUnit8Array[3] = inmueble.imagen4;
        this.imagenes[3] = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen4);

      }
    });
  }
  validateImage(input: HTMLInputElement) {
    const file = input.files[0];
    const fromControlName = input.getAttribute('formControlName');
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (!file) { return; }
    if (file.size > maxSizeInBytes) {
      this.inmuebleForm.get(fromControlName).setErrors({ imageValidator: { message: 'El archivo excede el tamaño máximo permitido de 5MB.' } });
      return;
    }
    const fileExtension = file.name.split('.').pop();
    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      this.inmuebleForm.get(fromControlName).setErrors({ imageValidator: { message: 'El archivo debe ser una imagen en formato jpg, jpeg, png o gif.' } });
      return;
    }
    this.inmuebleForm.get(fromControlName).setErrors(null);
  }
}