import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumn } from 'src/app/interfaces/table-column';
import { EstadoTarea } from 'src/app/models/estado-tarea';
import { Tarea } from 'src/app/models/tarea';
import { User } from 'src/app/models/user';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {
  buscadorFrom: FormGroup
  estadosTarea: EstadoTarea[] = [];
  usuarios: User[] = [];
  tareas: Tarea[] = [];
  minDate: Date = Utils.minDateMondayOrToday();
  constructor(
    private fb: FormBuilder,
    private estadoTareaService: EstadoTareaService,
    private usuarioService: UsuarioService,
    private tareaService: TareaService,
    private router: Router
  ) { }
  tableColumns: TableColumn[] = [
    { name: 'Titulo', dataKey: 'titulo' },
    { name: 'Descripcion', dataKey: 'descripcion' },
    { name: 'Fecha Inicio', dataKey: 'fechaInicio' },
    { name: 'Fecha Fin', dataKey: 'fechaFin' },
    { name: 'Estado', dataKey: 'estadoTarea' },
    { name: 'Usuario', dataKey: 'nombre' }
  ];
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCombos();
    this.cargarTareas();
  }
  crearFormulario() {
    this.buscadorFrom = this.fb.group({
      titulo: [],
      fechaInicio: [],
      fechaFin: [],
      descripcion: [],
      idEstadoTarea: [0],
      idUsuario: [0]
    });
  }
  busqueda() {
    this.tareas = [];
    this.tareaService.findAllByParams(this.buscadorFrom.value).subscribe((tareas: Tarea[]) => {
      this.tareas = tareas;
    }, error => Alerts.error('Error', 'Error al buscar las tareas', error));
  }
  limpiarFiltros() {
    Alerts.warning('Limpiar filtros', '¿Está seguro de limpiar los filtros?', 'Si, confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Info', 'Operación cancelada por el usuario');
        return;
      }
      this.buscadorFrom.reset();
      this.buscadorFrom.controls['idEstadoTarea'].setValue(0);
      this.buscadorFrom.controls['idUsuario'].setValue(0);
    });
  }
  cargarCombos() {
    this.estadoTareaService.findAll().subscribe((estados: EstadoTarea[]) => {
      this.estadosTarea = estados;
    }, error => Alerts.error('Error', 'Error al cargar los estados de tarea', error));
    this.usuarioService.findAll().subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
    }, error => Alerts.error('Error', 'Error al cargar los usuarios', error));
  }
  cargarTareas() {
    this.tareas = [];
    this.tareaService.findAll().subscribe((tarea: Tarea[]) => {
      this.tareas = tarea;
    }, error => Alerts.error('Error', 'Error al cargar laa tareas', error));
  }
  delete($event) {
    Alerts.warning('Eliminar', '¿Está seguro de eliminar la tarea?', 'Si, confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Info', 'Operación cancelada por el usuario');
        return;
      }
      this.tareaService.delete($event.idTarea).subscribe((response: any) => {
        Alerts.success('Exito', 'Tarea eliminada correctamente');
        this.cargarTareas();
      }, error => Alerts.error('Error', 'Error al eliminar la tarea', error));
    });
  }
  export($event) {
    this.tareaService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'inmuebles.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar las tareas', error);
    });
  }
  edit($event) {
    this.router.navigate(['/home-dashboard/tarea/editar/' + $event.idTarea]);
  }
}
