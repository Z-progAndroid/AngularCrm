import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TipoCita } from 'src/app/models/tipo-cita';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';
import { EstadoCitasService } from 'src/app/services/estado-citas.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { Inmueble } from 'src/app/models/inmueble';
import { User } from 'src/app/models/user';
import { Alerts } from 'src/app/utils/Alerts';
import { Cita } from 'src/app/models/cita';
import { CitasService } from 'src/app/services/citas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje';
defineLocale('es', esLocale);
@Component({
  selector: 'app-cita-crear',
  templateUrl: './cita-crear.component.html',
  styleUrls: ['./cita-crear.component.scss']
})
export class CitaCrearComponent extends BaseComponent implements OnInit {
  citaFrom: FormGroup;
  isEdit = false;
  minDate = Utils.minDateMondayOrToday();
  tiposCitas: TipoCita[] = [];
  estadosCita: EstadoCitas[] = [];
  inmuebles: Inmueble[] = [];
  clientes: User[] = [];
  citaConsultada: Cita;
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private tipoCitaService: TipoCitaService,
    private estadoCitaService: EstadoCitasService,
    private inmuebleService: InmuebleService,
    private usuarioService: UsuarioService,
    private citaService: CitasService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ) { super(); }

  ngOnInit(): void {
    this.localeService.use('es');
    this.crearFormulario();
    this.cargarCombos();
    this.citaFrom.get('fechaInicioTime').valueChanges.subscribe((time: string) => {
      this.onTimeChange(time, 'fechaInicioTime');
    });
    this.citaFrom.get('fechaFinTime').valueChanges.subscribe((time: string) => {
      this.onTimeChange(time, 'fechaFinTime');
    });
    if (this.rutaActiva.snapshot.params?.id) {
      this.citaService.findById(this.rutaActiva.snapshot.params.id).subscribe(cita => {
        this.citaConsultada = cita;
        const fechaIncio = new Date(cita.fechaIncio[0], cita.fechaIncio[1] - 1, cita.fechaIncio[2], cita.fechaIncio[3], cita.fechaIncio[4], cita.fechaIncio[5]);
        const fechaFin = new Date(cita.fechaFin[0], cita.fechaFin[1] - 1, cita.fechaFin[2], cita.fechaFin[3], cita.fechaFin[4], cita.fechaFin[5]);
        this.citaFrom.get("idCita").setValue(cita.idCita);
        this.citaFrom.get("descripcion").setValue(cita.descripcion);
        this.citaFrom.get("titulo").setValue(cita.titulo);
        this.citaFrom.get("fechaInicio").setValue(fechaIncio);
        this.citaFrom.get("fechaInicioTime").setValue(fechaIncio.toISOString());
        this.citaFrom.get("fechaFin").setValue(fechaFin);
        this.citaFrom.get("fechaFinTime").setValue(fechaFin.toISOString());
        this.citaFrom.get("fechaCreacion").setValue(cita.fechaCreacion);
        this.citaFrom.get("fechaModificacion").setValue(cita.fechaModificacion);
        this.citaFrom.get("modificado").setValue(cita.modificado);
        this.citaFrom.get("idTipoCita").setValue(cita.idTipoCita);
        this.citaFrom.get("idEstadoCita").setValue(cita.idEstadoCita);
        this.citaFrom.get("idInmueble").setValue(cita.idInmueble);
        this.citaFrom.get("idUsuarioCliente").setValue(cita.idUsuarioCliente);
      });
    }
  }
  cargarCombos() {
    this.tipoCitaService.findAll().subscribe(tiposCita => {
      this.tiposCitas = tiposCita;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de cita', error));
    this.estadoCitaService.findAll().subscribe(estadosCita => {
      this.estadosCita = estadosCita;
    }, error => Alerts.error('Error', 'Error al cargar los estados de cita', error));
    this.inmuebleService.findAll().subscribe(inmuebles => {
      this.inmuebles = inmuebles;
    }, error => Alerts.error('Error', 'Error al cargar los inmuebles', error));
    this.usuarioService.findAllClientes().subscribe(clientes => {
      this.clientes = clientes;
    }, error => Alerts.error('Error', 'Error al cargar los clientes', error));
  }
  crearFormulario() {
    this.citaFrom = this.fb.group({
      idCita: [''],
      descripcion: [''],
      titulo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaInicioTime: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaFinTime: ['', Validators.required],
      fechaCreacion: [''],
      fechaModificacion: [''],
      modificado: [''],
      idTipoCita: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idEstadoCita: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idInmueble: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idUsuarioCliente: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
    });
  }
  submit() {
    Alerts.warning('Confirmar', '¿Estas seguro de crear la cita?', 'Si, Crear').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operacion cancelada por el usuario');
        return;
      }
      if (!this.cambioFechas()) {
        this.guardarCita();
        return;
      }
      this.citaService.checkAvailability(this.cita.fechaIncio, this.cita.fechaFin, this.cita.idInmueble).subscribe((disponible: Mensaje) => {
        if (!disponible.error) {
          Alerts.error('Error', disponible.mensaje, null);
          return;
        }
        this.guardarCita();
      }, error => Alerts.error('Error', 'Error al validar la disponibilidad del inmueble', error));
    });
  }

  onTimeChange(time: string, controlName: string) {
    if (time === null) {
      this.citaFrom.get(controlName).setErrors({ 'tiempoInvalido': true });
      return;
    }
    this.citaFrom.get(controlName).setErrors(null);
    const fechaInicio = this.citaFrom.get('fechaInicio').value;
    const fechaFin = this.citaFrom.get('fechaFin').value;
    if (Utils.isNullOrUndefined(fechaInicio) || Utils.isNullOrUndefined(fechaFin)) { return; }
    const fechaInicioTime = this.citaFrom.get('fechaInicioTime').value;
    const fechaFinTime = this.citaFrom.get('fechaFinTime').value;
    if (Utils.isNullOrUndefined(fechaInicioTime) || Utils.isNullOrUndefined(fechaFinTime)) { return; }
    const fechaInicioCombinada = this.combinarFechas('fechaInicio', 'fechaInicioTime');
    const fechaFinCombinada = this.combinarFechas('fechaFin', 'fechaFinTime');
    if (fechaInicioCombinada > fechaFinCombinada) {
      this.citaFrom.get('fechaFin').setErrors({ 'fechaFinMayor': true });
      return;
    }
    if (fechaInicioCombinada < fechaFinCombinada) {
      this.citaFrom.get('fechaFin').setErrors({});
      this.citaFrom.get('fechaFin').updateValueAndValidity();
      return;
    }
  }
  combinarFechas(fechaControlName: string, fechaTimeControlName: string): Date {
    const fechaInicio = this.citaFrom.get(fechaControlName).value;
    const fechaInicioTime = this.citaFrom.get(fechaTimeControlName).value;
    const hours = fechaInicioTime.getHours();
    const minutes = fechaInicioTime.getMinutes();
    const nuevaFecha = new Date(fechaInicio);
    nuevaFecha.setHours(hours);
    nuevaFecha.setMinutes(minutes);
    // Convertir la fecha a formato ISO 8601 con la zona horaria en UTC+2 (dos horas adelante)
    const offset = -2;
    const offsetMs = offset * 60 * 60 * 1000;
    const dateWithOffset = new Date(nuevaFecha.getTime() - offsetMs);
    return dateWithOffset;
  }
  private get cita(): Cita {
    let cita = new Cita();
    cita.idCita = this.citaFrom.get('idCita').value;
    cita.titulo = this.citaFrom.get('titulo').value;
    cita.descripcion = this.citaFrom.get('descripcion').value;
    cita.fechaIncio = this.combinarFechas('fechaInicio', 'fechaInicioTime');
    cita.fechaFin = this.combinarFechas('fechaFin', 'fechaFinTime');
    cita.fechaCreacion = Utils.isNullOrUndefined(this.citaFrom.get('fechaCreacion').value)
      ? new Date()
      : this.citaFrom.get('fechaCreacion').value;
    cita.fechaModificacion = new Date();
    cita.modificado = 'admin';
    cita.idTipoCita = this.citaFrom.get('idTipoCita').value;
    cita.idEstadoCita = this.citaFrom.get('idEstadoCita').value;
    cita.idInmueble = this.citaFrom.get('idInmueble').value;
    cita.idUsuarioCliente = this.citaFrom.get('idUsuarioCliente').value;
    return cita;
  }
  guardarCita() {
    this.citaService.save(this.cita).subscribe((cita: Cita) => {
      Alerts.success('Exito', 'Cita creada correctamente');
      this.router.navigate(['/home-dashboard/cita']);
    }, error => Alerts.error('Error', 'Error al crear la cita', error));
  }
  cambioFechas(): boolean {
    if (Utils.isNullOrUndefined(this.citaConsultada)) { return true; }
    const fechaIncioConsultada = new Date(this.citaConsultada.fechaIncio[0], this.citaConsultada.fechaIncio[1] - 1, this.citaConsultada.fechaIncio[2], this.citaConsultada.fechaIncio[3], this.citaConsultada.fechaIncio[4], this.citaConsultada.fechaIncio[5]);
    const fechaFinConsultada = new Date(this.citaConsultada.fechaFin[0], this.citaConsultada.fechaFin[1] - 1, this.citaConsultada.fechaFin[2], this.citaConsultada.fechaFin[3], this.citaConsultada.fechaFin[4], this.citaConsultada.fechaFin[5]);
    if (
      fechaIncioConsultada.getFullYear() === this.cita.fechaIncio.getFullYear() &&
      fechaIncioConsultada.getMonth() === this.cita.fechaIncio.getMonth() &&
      fechaIncioConsultada.getDate() === this.cita.fechaIncio.getDate() &&
      fechaIncioConsultada.getHours() === this.cita.fechaIncio.getHours() - 2 &&
      fechaIncioConsultada.getMinutes() === this.cita.fechaIncio.getMinutes() &&
      fechaFinConsultada.getFullYear() === this.cita.fechaFin.getFullYear() &&
      fechaFinConsultada.getMonth() === this.cita.fechaFin.getMonth() &&
      fechaFinConsultada.getDate() === this.cita.fechaFin.getDate() &&
      fechaFinConsultada.getHours() === this.cita.fechaFin.getHours() - 2 &&
      fechaFinConsultada.getMinutes() === this.cita.fechaFin.getMinutes()
    ) { return false; }
    return true;
  }

  borrarCita() {
    Alerts.warning('Advertencia', '¿Está seguro que desea eliminar la cita, se eliminara permanentemente?', 'Si, eliminar').then(result => {
      if (!result.value) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.citaService.delete(this.cita.idCita).subscribe((cita: Mensaje) => {
        Alerts.success('Exito', 'Cita eliminada correctamente');
        this.router.navigate(['/home-dashboard/cita']);
      }, error => Alerts.error('Error', 'Error al eliminar la cita', error));
    });
  }
}

