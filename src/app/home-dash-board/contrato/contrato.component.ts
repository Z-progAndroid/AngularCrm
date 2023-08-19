import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { TableColumn } from 'src/app/interfaces/table-column';
import { Router } from '@angular/router';
defineLocale('es', esLocale);

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent extends BaseComponent implements OnInit {
  buscadorFrom: FormGroup
  tipoContratos: TipoContrato[] = [];
  tipoPagos: TipoPago[] = [];
  inmuebles: Inmueble[] = [];
  estadosContrato: Estadocontrato[] = [];
  usuarios: User[] = [];
  contratos: Contrato[] = [];
  tableColumns: TableColumn[] = [
    { name: 'Titulo', dataKey: 'titulo' },
    { name: 'Fecha Inicio', dataKey: 'fechaInicio' },
    { name: 'Fecha Fin', dataKey: 'fechaFinalizacion' },
    { name: 'Valor', dataKey: 'valor' },
    { name: 'Estado', dataKey: 'estadoContrato', }
  ];
  constructor(
    private fb: FormBuilder,
    private tipoContratoService: TipoContratoService,
    private tipoPagoService: TipoPagoService,
    private inmuebleService: InmuebleService,
    private estadoContratoService: EstadoContratoService,
    private usuarioService: UsuarioService,
    private contratoService: ContratoService,
    private localeService: BsLocaleService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.localeService.use('es');
    this.crearFormulario();
    this.cargarCombos();
    this.cargarContratos();
  }
  busqueda() {
    this.contratos = [];
    this.contratoService.search(this.contrato).subscribe((data) => {
      this.contratos = data;
    }, error => Alerts.error('Error', 'Error al buscar contratos', error));
  }

  crearFormulario() {
    this.buscadorFrom = this.fb.group({
      titulo: [],
      fechaInicio: [],
      fechaFin: [],
      descripcion: [],
      idTipoContrato: [0],
      idTipoPago: [0],
      idInmueble: [0],
      idEstadoContrato: [0],
      idCliente: [0],
    });
  }
  limpiarFiltros() {
    Alerts.warning('Limpiar filtros', '¿Está seguro de limpiar los filtros?', 'Sí, limpiar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          return;
        }
        this.buscadorFrom.reset();
        this.buscadorFrom.get('idTipoContrato').setValue(0);
        this.buscadorFrom.get('idTipoPago').setValue(0);
        this.buscadorFrom.get('idInmueble').setValue(0);
        this.buscadorFrom.get('idEstadoContrato').setValue(0);
        this.buscadorFrom.get('idCliente').setValue(0);
      });
  }
  cargarCombos() {
    this.tipoContratoService.findAll().subscribe(
      (data) => {
        this.tipoContratos = data;
      }, error => Alerts.error('Error', 'Error al cargar combo tipo contrato', error));
    this.tipoPagoService.findAll().subscribe(
      (data) => {
        this.tipoPagos = data;
      }, error => Alerts.error('Error', 'Error al cargar combo tipo pagos', error));
    this.inmuebleService.findAll().subscribe(
      (data) => {
        this.inmuebles = data;
      }, error => Alerts.error('Error', 'Error al cargar combo inmuebles', error));
    this.estadoContratoService.findAll().subscribe(
      (data) => {
        this.estadosContrato = data;
      }, error => Alerts.error('Error', 'Error al cargar  combo estados', error));
    this.usuarioService.findAllClientes().subscribe(
      (data) => {
        this.usuarios = data;
      }, error => Alerts.error('Error', 'Error al cargar combo clientes', error));
  }
  cargarContratos() {
    this.contratoService.findAll().subscribe((data) => {
      this.contratos = data;
    }, error => Alerts.error('Error', 'Error al cargar contratos', error));
  }
  private get contrato(): Contrato {
    let contrato = new Contrato();
    contrato.titulo = this.buscadorFrom.get('titulo').value
    contrato.fechaInicio = this.buscadorFrom.get('fechaInicio').value
    contrato.fechaFinalizacion = this.buscadorFrom.get('fechaFin').value
    contrato.descripcion = this.buscadorFrom.get('descripcion').value
    contrato.idTipoContrato = this.buscadorFrom.get('idTipoContrato').value
    contrato.idTipoPago = this.buscadorFrom.get('idTipoPago').value
    contrato.idInmueble = this.buscadorFrom.get('idInmueble').value
    contrato.idEstadoContrato = this.buscadorFrom.get('idEstadoContrato').value
    contrato.cliente = this.buscadorFrom.get('idCliente').value
    return contrato;
  }
  delete($event) {
    Alerts.warning('Eliminar contrato', '¿Está seguro de eliminar el contrato?,se eliminara definitivamente', 'Sí, eliminar')
    .then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
  
      this.contratoService.delete($event.idContrato).subscribe(() => {
        Alerts.success('Eliminado', 'Contrato eliminado correctamente');
        this.cargarContratos();
      }, error => Alerts.error('Error', 'Error al eliminar contrato', error));
    });
  }
  export($event) {
    console.log("export eeeee", $event)
    this.contratoService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      this.descargarFichero(data , 'contratos.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, error => Alerts.error('Error', 'Error al exportar contratos', error));
  }
  downloadPdf($event) {
    this.contratoService.generarContratoPdf($event.idContrato).subscribe((data) => {
      this.descargarFichero(data , 'contrato.pdf', 'application/pdf');
    }, error => Alerts.error('Error', 'Error al obtener contrato', error));
  }
  edit($event) {
    console.log("edit", $event)
    this.router.navigate(['/home-dashboard/contrato/editar', $event.idContrato]);
  }

}
