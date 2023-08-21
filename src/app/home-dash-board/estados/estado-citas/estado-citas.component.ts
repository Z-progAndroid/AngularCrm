import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { Mensaje } from 'src/app/models/mensaje';
import { EstadoCitasService } from 'src/app/services/estado-citas.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-estado-citas',
  templateUrl: './estado-citas.component.html',
  styleUrls: ['./estado-citas.component.scss']
})
export class EstadoCitasComponent implements OnInit {
  estadoCitasForm: FormGroup;
  estadosCita: EstadoCitas[];
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'idEstadoCita' },
    { name: 'Estado', dataKey: 'estadoCita', }
  ];
  constructor(
    private fb: FormBuilder,
    private estadoCitasService: EstadoCitasService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarEstadosCita();
  }

  submit() {
    Alerts.warning('Advertencia', '¿Está seguro que desea guardar el estado?', 'Guardar').then((result: any) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.estadoCitasService.save(this.estadoCita).subscribe(
        (data: any) => {
          Alerts.success('Éxito', 'Estado guardado correctamente');
          this.estadoCitasForm.reset();
          this.cargarEstadosCita();
        },
        (error: any) => Alerts.error('Error', 'No se pudo guardar el estado', error)
      );
    });
  }

  crearFormulario() {
    this.estadoCitasForm = this.fb.group({
      idEstadoCita: ['', Validators.required],
      estadoCita: ['', Validators.required],
      fechaCreacion: ['']
    });
  }

  cargarEstadosCita() {
    this.estadosCita = [];
    this.estadoCitasService.findAll().subscribe(
      (data: EstadoCitas[]) => {
        this.estadosCita = data;
      },
      (error: any) => Alerts.error('Error', 'Error al cargar los estados', error)
    );
  }
  private get estadoCita(): EstadoCitas {
    let estadoCita: EstadoCitas = Object.assign({}, this.estadoCitasForm.value);
    estadoCita.fechaModificacion = new Date();
    estadoCita.modificado = 'admin';
    Utils.isNullOrUndefined(estadoCita.fechaCreacion)
      ? estadoCita.fechaCreacion = new Date()
      : estadoCita.fechaCreacion = estadoCita.fechaCreacion;
    return estadoCita;
  }
  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro que desea eliminar el estado?', 'Eliminar').then((result: any) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.estadoCitasService.delete($event.idEstadoCita).subscribe(
        (mensaje: Mensaje) => {
          Alerts.success('Éxito', 'Estado eliminado correctamente').then(() => this.cargarEstadosCita());
        },
        (error: any) => Alerts.error('Error', 'Error al eliminar el estado', error)
      );
    });
  }
  export($event) {
    this.estadoCitasService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'estado-citas.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.estadoCitasService.findById($event.idEstadoCita).subscribe(
      (estadoCita: EstadoCitas) => {
        this.estadoCitasForm.patchValue(estadoCita);
        this.estadoCitasForm.enable();
      },(error: any) => Alerts.error('Error', 'No se pudo obtener el estado', error));
  }
}
