import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { AuthService } from 'src/app/services/auth.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipo-contratos',
  templateUrl: './tipo-contratos.component.html',
  styleUrls: ['./tipo-contratos.component.scss']
})
export class TipoContratosComponent {
  tipoContratoForm: FormGroup
  tiposContratos: TipoContrato[]
  constructor(
    private fb: FormBuilder,
    private tipoContratoService: TipoContratoService,
    private authService: AuthService,
  ) { }
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'idTipoContrato' },
    { name: 'Tipo', dataKey: 'tipo', }
  ];
  ngOnInit(): void {
    this.creacionFormulario();
    this.cargarTiposContrato();
  }
  submit() {
    Alerts.warning('Avertencia', '¿Está seguro de guardar el tipo de contrato?', 'Aceptar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tipoContratoService.save(this.tipoContrato).subscribe((tipoContrato: TipoContrato) => {
        Alerts.success('Operación exitosa', 'El tipo de contrato se ha guardado correctamente');
        this.cargarTiposContrato();
        this.tipoContratoForm.reset();
      }, error => Alerts.error('Error', 'No se ha podido guardar el tipo de contrato', error));
    });
  }
  creacionFormulario() {
    this.tipoContratoForm = this.fb.group({
      idTipoContrato: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
  cargarTiposContrato() {
    this.tipoContratoService.findAll().subscribe((tipoContrato: TipoContrato[]) => {
      this.tiposContratos = tipoContrato
    }, error => Alerts.error('Error', 'No se ha podido cargar los tipos de contrato', error));
  }
  private get tipoContrato() {
    let tipoContrato: TipoContrato = new TipoContrato();
    tipoContrato.idTipoContrato = this.tipoContratoForm.get('idTipoContrato').value;
    tipoContrato.tipo = this.tipoContratoForm.get('tipo').value;
    tipoContrato.fechaCreacion = Utils.isNullOrUndefined(this.tipoContratoForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoContratoForm.get('fechaCreacion').value;
    tipoContrato.fechaModificacion = new Date();
    tipoContrato.modificado = this.authService.getUsername();
    return tipoContrato;
  }
  delete($event) {
    Alerts.warning('Avertencia', '¿Está seguro de eliminar el tipo de contrato?', 'Aceptar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tipoContratoService.delete($event.idTipoContrato).subscribe((mensaje: any) => {
        Alerts.success('Operación exitosa', 'El tipo de contrato se ha eliminado correctamente');
        this.cargarTiposContrato();
        this.tipoContratoForm.reset();
      }, error => Alerts.error('Error', 'No se ha podido eliminar el tipo de contrato', error));
    });
  }
  export($event) {
    this.tipoContratoService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'tipo-contratos.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.tipoContratoService.findById($event.idTipoContrato).subscribe((tipoContrato: TipoContrato) => {
      this.tipoContratoForm.patchValue(tipoContrato);
      this.tipoContratoForm.enable();
    }, error => Alerts.error('Error', 'No se ha podido cargar el tipo de contrato', error));
  }
}
