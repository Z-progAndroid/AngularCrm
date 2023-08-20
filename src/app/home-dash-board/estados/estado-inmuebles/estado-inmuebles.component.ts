import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { EstadoInmueble } from 'src/app/models/estado-inmueble';
import { EstadoInmuebleService } from 'src/app/services/estado-inmueble.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-estado-inmuebles',
  templateUrl: './estado-inmuebles.component.html',
  styleUrls: ['./estado-inmuebles.component.scss']
})
export class EstadoInmueblesComponent {
  estadoInmuebleForm: FormGroup
  estadosInmueble: EstadoInmueble[]
  constructor(
    private fb: FormBuilder,
    private inmuebleEstados: EstadoInmuebleService) { }
    tableColumns: TableColumn[] = [
      { name: 'ID', dataKey: 'idEstadoInmueble' },
      { name: 'Estado', dataKey: 'estado' },
    ];
  ngOnInit(): void {
    this.crearFromulario();
    this.cargarEstadosInmueble();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Está seguro que desea guardar el estado?', 'Sí, guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadoInmuebleForm.reset();
          return;
        }
        this.inmuebleEstados.save(this.estadoInmueble).subscribe((data) => {
          Alerts.success('Éxito', 'Estado guardado correctamente');
          this.estadoInmuebleForm.reset()
          this.cargarEstadosInmueble();
        }, error => Alerts.error('Error', 'No se pudo guardar el estado', error));
      });
  }
  eliminar(id: number) {
    Alerts.warning('Advertencia', '¿Está seguro que desea eliminar el estado?', 'Sí, eliminar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadoInmuebleForm.reset();
          return;
        }
        this.inmuebleEstados.delete(id).subscribe((data) => {
          Alerts.success('Éxito', 'Estado eliminado correctamente');
          this.cargarEstadosInmueble();
        }, error => Alerts.error('Error', 'No se pudo eliminar el estado', error));
      });
  }
  editar(id: number) {
    this.inmuebleEstados.findById(id).subscribe((data) => {
      this.estadoInmuebleForm.get('idEstadoInmueble').setValue(data.idEstadoInmueble)
      this.estadoInmuebleForm.get('estadoInmueble').setValue(data.estado)
      this.estadoInmuebleForm.get('fechaCreacion').setValue(data.fechaCreacion)
      this.estadoInmuebleForm.enable();
    }, error => Alerts.error('Error', 'No se pudo editar el estado', error));
  }
  ver(id: number) {
    this.inmuebleEstados.findById(id).subscribe(
      (data) => {
        this.estadoInmuebleForm.get('idEstadoInmueble').setValue(data.idEstadoInmueble)
        this.estadoInmuebleForm.get('estadoInmueble').setValue(data.estado)
        this.estadoInmuebleForm.get('fechaCreacion').setValue(data.fechaCreacion)
        this.estadoInmuebleForm.disable();
      }, error => Alerts.error('Error', 'No se pudo ver el estado', error));
  }
  cargarEstadosInmueble() {
    this.inmuebleEstados.findAll().subscribe(
      (data) => {
        this.estadosInmueble = data
      }, error => Alerts.error('Error', 'No se pudo cargar los estados', error));
  }
  crearFromulario() {
    this.estadoInmuebleForm = this.fb.group({
      idEstadoInmueble: ['', Validators.required],
      estadoInmueble: ['', Validators.required],
      fechaCreacion: ['']
    })
  }
  private get estadoInmueble(): EstadoInmueble {
    let estadoInmueble: EstadoInmueble = new EstadoInmueble();
    estadoInmueble.idEstadoInmueble = this.estadoInmuebleForm.get('idEstadoInmueble').value
    estadoInmueble.estado = this.estadoInmuebleForm.get('estadoInmueble').value
    estadoInmueble.fechaCreacion = Utils.isNullOrUndefined(this.estadoInmuebleForm.get('fechaCreacion').value)
      ? new Date()
      : this.estadoInmuebleForm.get('fechaCreacion').value
    estadoInmueble.fechaModificacion = new Date()
    estadoInmueble.modificado = 'admin'
    return estadoInmueble;
  }
  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro que desea eliminar el estado?', 'Sí, eliminar')
    .then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        this.estadoInmuebleForm.reset();
        return;
      }
      this.inmuebleEstados.delete($event.idEstadoInmueble).subscribe((data) => {
        Alerts.success('Éxito', 'Estado eliminado correctamente');
        this.cargarEstadosInmueble();
      }, error => Alerts.error('Error', 'No se pudo eliminar el estado', error));
    });
  }
  export($event) {
    this.inmuebleEstados.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'estado-inmuebles.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar las tareas', error);
    });
  }
  edit($event) {
    this.inmuebleEstados.findById($event.idEstadoInmueble).subscribe((data) => {
      this.estadoInmuebleForm.get('idEstadoInmueble').setValue(data.idEstadoInmueble)
      this.estadoInmuebleForm.get('estadoInmueble').setValue(data.estado)
      this.estadoInmuebleForm.get('fechaCreacion').setValue(data.fechaCreacion)
      this.estadoInmuebleForm.enable();
    }, error => Alerts.error('Error', 'No se pudo editar el estado', error));
  }
}
