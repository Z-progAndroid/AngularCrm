import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/interfaces/table-column';
import { Estadocontrato } from 'src/app/models/estadocontrato';
import { AuthService } from 'src/app/services/auth.service';
import { EstadoContratoService } from 'src/app/services/estado-contrato.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-estado-contratos',
  templateUrl: './estado-contratos.component.html',
  styleUrls: ['./estado-contratos.component.scss']
})
export class EstadoContratosComponent implements OnInit {
  estadocontratoForm: FormGroup;
  estadosContrato: Estadocontrato[];
  disabled: boolean = false;
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'idestadoContrato' },
    { name: 'Estado', dataKey: 'estado' },
  ];
  constructor(
    private fb: FormBuilder,
    private estadocontratoService: EstadoContratoService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.cargarEstadosContrato();
  }
  createForm() {
    this.estadocontratoForm = this.fb.group({
      idEstadoContrato: ['', [Validators.required]],
      estadoContrato: ['', [Validators.required]],
      fechaCreacion: ['']
    });
  }

  submit() {
    Alerts.warning('Advertencia', '¿Está seguro que desea guardar el estado?', 'Sí, guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadocontratoForm.reset();
          return;
        }
        this.estadocontratoService.save(this.estadoContrato).subscribe((data: Estadocontrato) => {
            Alerts.success('Éxito', 'Estado guardado correctamente');
            this.cargarEstadosContrato();
            this.estadocontratoForm.reset();
          }, (error) => Alerts.error('Error', 'No se pudo guardar el estado', error));
      });

  }
  editar(id: number) {
    this.estadocontratoService.findById(id).subscribe((data: Estadocontrato) => {
      this.estadocontratoForm.get('idEstadoContrato').setValue(data.idestadoContrato);
      this.estadocontratoForm.get('estadoContrato').setValue(data.estado);
      this.estadocontratoForm.get('fechaCreacion').setValue(data.fechaCreacion);
      this.estadocontratoForm.enable();
    }, (error) => Alerts.error('Error', 'No se pudo obtener el estado', error));
  }
  cargarEstadosContrato() {
    this.estadosContrato = [];
    this.estadocontratoService.findAll().subscribe((data: Estadocontrato[]) => {
      this.estadosContrato = data;
    }, (error) => Alerts.error('Error', 'No se pudo obtener los estados', error));
  }
  private get estadoContrato(): Estadocontrato {
    let estadoContrato: Estadocontrato = new Estadocontrato();
    estadoContrato.idestadoContrato = this.estadocontratoForm.get('idEstadoContrato').value;
    estadoContrato.estado = this.estadocontratoForm.get('estadoContrato').value;
    estadoContrato.fechaCreacion = Utils.isNullOrUndefined(this.estadocontratoForm.get('fechaCreacion').value)
      ? new Date()
      : this.estadocontratoForm.get('fechaCreacion').value;
    estadoContrato.fechaModificacion = new Date();
    estadoContrato.modificado = this.authService.getUsername();;
    return estadoContrato;
  }

  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro que desea eliminar el estado?', 'Sí, eliminar').
      then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadocontratoForm.reset();
          return;
        }
        this.estadocontratoService.delete($event.idestadoContrato).subscribe((data: any) => {
          Alerts.success('Éxito', 'Estado eliminado correctamente');
          this.cargarEstadosContrato();
        }, (error) => Alerts.error('Error', 'No se pudo eliminar el estado', error));

      });
  }
  export($event) {
    this.estadocontratoService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'estado-contratos.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar las tareas', error);
    });
  }
  edit($event) {
    this.estadocontratoService.findById($event.idestadoContrato).subscribe((data: Estadocontrato) => {
      this.estadocontratoForm.get('idEstadoContrato').setValue(data.idestadoContrato);
      this.estadocontratoForm.get('estadoContrato').setValue(data.estado);
      this.estadocontratoForm.get('fechaCreacion').setValue(data.fechaCreacion);
      this.estadocontratoForm.enable();
    }, (error) => Alerts.error('Error', 'No se pudo obtener el estado', error));
  }
}
