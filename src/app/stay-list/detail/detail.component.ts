import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Inmueble } from 'src/app/models/inmueble';
import { TipoCita } from 'src/app/models/tipo-cita';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';
import { Alerts } from 'src/app/utils/Alerts';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CitasService } from 'src/app/services/citas.service';
import { Mensaje } from 'src/app/models/mensaje';
import { Cita } from 'src/app/models/cita';
defineLocale('es', esLocale);
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  inmueble: Inmueble;
  citaFrom: FormGroup;
  minDate = Utils.minDateMondayOrToday();
  tiposCitas: TipoCita[] = [];
  constructor(
    private inmuebleService: InmuebleService,
    private router: Router,
    private citaService: CitasService,
    private rutaActiva: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private tipoCitService: TipoCitaService,
    private localeService: BsLocaleService
  ) { }
  ngOnInit(): void {
    this.localeService.use('es');
    this.crearFormulario();
    this.cargarTiposCitas();
    if (this.rutaActiva.snapshot.params?.id) {
      this.inmuebleService.findById(this.rutaActiva.snapshot.params.id).subscribe(data => {
        this.inmueble = data;
        this.inmueble.imagenes = [];
        if (this.inmueble.imagen1) this.inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.inmueble.imagen1));
        if (this.inmueble.imagen2) this.inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.inmueble.imagen2));
        if (this.inmueble.imagen3) this.inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.inmueble.imagen3));
        if (this.inmueble.imagen4) this.inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.inmueble.imagen4));
      }, error => Alerts.error('Error', 'Error al cargar el inmueble', error));
    }
  }
  submit() {
    Alerts.warning('Advertencia', 'Esta seguro de crear la cita? ', 'Si,confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Info', 'Operacion cancelada por el usuario');
        return;
      }
      let fechaInicio = this.combinarFechas(this.citaFrom.get('fechaInicio').value, this.citaFrom.get('fechaInicioTime').value, 0)
      let fechaFin = this.combinarFechas(this.citaFrom.get('fechaInicio').value, this.citaFrom.get('fechaInicioTime').value, 1)
      this.citaService.checkAvailability(fechaInicio, fechaFin, this.inmueble.idInmueble).subscribe((disponible: Mensaje) => {
        if (!disponible.error) {
          Alerts.error('Error', disponible.mensaje, null);
          return;
        }
      }, error => Alerts.error('Error', 'Error al comprobar la disponibilidad del inmueble', error));
      let cita = new Cita();
      cita.titulo = "Visita " + this.inmueble.direccion;
      cita.descripcion = this.citaFrom.get('descripcion').value;
      cita.fechaIncio = fechaInicio;
      cita.fechaFin = fechaFin;
      cita.fechaCreacion = new Date();
      cita.fechaModificacion = new Date();
      cita.modificado = "admin";
      cita.idTipoCita = 1;
      cita.idEstadoCita = 1;
      cita.idInmueble = this.inmueble.idInmueble;
      cita.idUsuarioCliente = 3;
      this.citaService.save(cita).subscribe(data => {
        Alerts.success('Exito', 'Cita creada correctamente en el sistema nos pondremos en contacto con usted');
        this.router.navigate(['/listado']);
      }, error => Alerts.error('Error', 'Error al crear la cita', error));
    }, error => Alerts.error('Error', 'Error al comprobar la disponibilidad del inmueble', error));
  }
  crearFormulario() {
    this.citaFrom = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaInicioTime: ['', Validators.required],
      descripcion: [''],
    }, { validators: [CustomValidators.validateDate] });
  }
  cargarTiposCitas() {
    this.tipoCitService.findAll().subscribe(data => {
      this.tiposCitas = data;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de citas', error));
  }
  combinarFechas(fechaControlName: Date, fechaTimeControlName: Date, horasDeMas: number): Date {
    const fechaInicio = fechaControlName;
    const fechaInicioTime = fechaTimeControlName;
    const hours = fechaInicioTime.getHours();
    const minutes = fechaInicioTime.getMinutes();
    const nuevaFecha = new Date(fechaInicio);
    if (horasDeMas == null || horasDeMas == undefined || horasDeMas == 0) {
      nuevaFecha.setHours(hours);
    } else {
      nuevaFecha.setHours(hours + horasDeMas);
    }
    nuevaFecha.setMinutes(minutes);
    // Convertir la fecha a formato ISO 8601 con la zona horaria en UTC+2 (dos horas adelante)
    const offset = -2;
    const offsetMs = offset * 60 * 60 * 1000;
    const dateWithOffset = new Date(nuevaFecha.getTime() - offsetMs);
    return dateWithOffset;
  }
  descargar(idInmueble: number) {
    this.inmuebleService.generarInmuebleDetallePdf(idInmueble).subscribe(data => {
      Utils.descargarFichero(data , 'inmuebleDetalle.pdf', 'application/pdf');
    }, error => Alerts.error('Error', 'Error al generar el pdf', error));
  }
}
