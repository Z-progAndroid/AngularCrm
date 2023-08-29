import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contrato } from 'src/app/models/contrato';
import { Estadocontrato } from 'src/app/models/estadocontrato';
import { Inmueble } from 'src/app/models/inmueble';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoPago } from 'src/app/models/tipo-pago';
import { User } from 'src/app/models/user';
import { ContratoService } from 'src/app/services/contrato.service';
import { EstadoContratoService } from 'src/app/services/estado-contrato.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
defineLocale('es', esLocale);
@Component({
  selector: 'app-contrato-editar',
  templateUrl: './contrato-editar.component.html',
  styleUrls: ['./contrato-editar.component.scss']
})
export class ContratoEditarComponent extends BaseComponent implements OnInit {
  contratoFrom: FormGroup
  tipoContratos: TipoContrato[] = [];
  tipoPagos: TipoPago[] = [];
  inmuebles: Inmueble[] = [];
  estadosContrato: Estadocontrato[] = [];
  usuarios: User[] = [];
  contratos: Contrato[] = [];
  constructor(
    private fb: FormBuilder,
    private tipoContratoService: TipoContratoService,
    private tipoPagoService: TipoPagoService,
    private inmuebleService: InmuebleService,
    private estadoContratoService: EstadoContratoService,
    private usuarioService: UsuarioService,
    private contratoService: ContratoService,
    private localeService: BsLocaleService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private authService: AuthService,
    
  ) {
    super();
  }
  ngOnInit(): void {
    this.localeService.use('es');
    this.crearFormulario();
    this.cargarCombos();
    let id = this.rutaActiva.snapshot.params['id'];
    if (id) {
      this.contratoService.findById(id).subscribe((tarea: Contrato) => {
        this.contratoFrom.patchValue(tarea);
        this.contratoFrom.get('fechaInicio').setValue(new Date(tarea.fechaInicio));
        this.contratoFrom.get('fechaFin').setValue(new Date(tarea.fechaFinalizacion));
        this.contratoFrom.get('idCliente').setValue(tarea.cliente);
      }, error => Alerts.error('Error', 'Error al cargar la tarea', error));
    }
  }
  submit() {
      Alerts.warning("Avertencia", "¿Está seguro de guardar el contrato?", 'Si, guardar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.contratoService.save(this.contrato).subscribe((data) => {
        Alerts.success('Exito', 'Contrato guardado correctamente');
        this.router.navigate(['/home-dashboard/contrato']);
      }, error => Alerts.error('Error', 'Error al guardar contrato', error));
    });
  }


  crearFormulario() {
    this.contratoFrom = this.fb.group({
      idContrato: [],
      terminos: [],
      valor: ['', Validators.required],
      observaciones: [],
      titulo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaCreacion: [],
      descripcion: [],
      idTipoContrato: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idTipoPago: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idInmueble: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idEstadoContrato: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idCliente: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
    }, { validator: CustomValidators.dateRangeValidator() });
  }
  cargarCombos() {
    this.tipoContratoService.findAll().subscribe((data) => {
      this.tipoContratos = data;
    }, error => Alerts.error('Error', 'Error al cargar combo tipo contrato', error));
    this.tipoPagoService.findAll().subscribe((data) => {
      this.tipoPagos = data;
    }, error => Alerts.error('Error', 'Error al cargar combo tipo pagos', error));
    this.inmuebleService.findAll().subscribe((data) => {
      this.inmuebles = data;
    }, error => Alerts.error('Error', 'Error al cargar combo inmuebles', error));
    this.estadoContratoService.findAll().subscribe((data) => {
      this.estadosContrato = data;
    }, error => Alerts.error('Error', 'Error al cargar  combo estados', error));
    this.usuarioService.findAll().subscribe((data) => {
      this.usuarios = data;
    }, error => Alerts.error('Error', 'Error al cargar combo clientes', error));
  }

  private get contrato(): Contrato {
    let contrato = new Contrato();
    contrato.idContrato = this.contratoFrom.get('idContrato').value
    contrato.titulo = this.contratoFrom.get('titulo').value
    contrato.fechaInicio = this.contratoFrom.get('fechaInicio').value
    contrato.fechaFinalizacion = this.contratoFrom.get('fechaFin').value
    contrato.descripcion = this.contratoFrom.get('descripcion').value
    contrato.terminosYCondiciones = this.contratoFrom.get('terminos').value
    contrato.valor = this.contratoFrom.get('valor').value
    contrato.observaciones = this.contratoFrom.get('observaciones').value
    contrato.fechaCreacion = Utils.isNullOrUndefined(this.contratoFrom.get('fechaCreacion').value)
      ? new Date()
      : this.contratoFrom.get('fechaCreacion').value
    contrato.fechaModificacion = new Date();
    contrato.modificado = this.authService.getUsername();
    contrato.idTipoContrato = this.contratoFrom.get('idTipoContrato').value
    contrato.idTipoPago = this.contratoFrom.get('idTipoPago').value
    contrato.idInmueble = this.contratoFrom.get('idInmueble').value
    contrato.idEstadoContrato = this.contratoFrom.get('idEstadoContrato').value
    contrato.cliente = this.contratoFrom.get('idCliente').value
    return contrato;
  }
}
