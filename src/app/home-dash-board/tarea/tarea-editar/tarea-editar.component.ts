import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { EstadoTarea } from 'src/app/models/estado-tarea';
import { Tarea } from 'src/app/models/tarea';
import { User } from 'src/app/models/user';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
defineLocale('es', esLocale);
@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.component.html',
  styleUrls: ['./tarea-editar.component.scss']
})
export class TareaEditarComponent extends BaseComponent implements OnInit {
  tareaFrom: FormGroup;
  estadosTarea: EstadoTarea[] = [];
  usuarios: User[] = [];
  tareas: Tarea[] = [];
  minDate = Utils.firstMondaytInMonth();
  constructor(
    private fb: FormBuilder,
    private estadoTareaService: EstadoTareaService,
    private usuarioService: UsuarioService,
    private tareaService: TareaService,
    private localeService: BsLocaleService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.localeService.use('es');
    this.crearFormulario();
    this.cargarCombos();
    let id = this.rutaActiva.snapshot.params['id'];
    if (id) {
      this.tareaService.findById(id).subscribe((tarea: Tarea) => {
        this.tareaFrom.patchValue(tarea);
        this.tareaFrom.get('fechaInicio').setValue(new Date(tarea.fechaInicio));
        this.tareaFrom.get('fechaFin').setValue(new Date(tarea.fechaFin));
      }, error => Alerts.error('Error', 'Error al cargar la tarea', error));
    }

  }

  guardar() {
    Alerts.warning('Advertencia', '¿Está seguro de guardar los cambios?', 'Si, confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tareaService.save(this.tarea).subscribe((tarea: Tarea) => {
        Alerts.success('Operación exitosa', 'Tarea guardada correctamente');
        this.tareaFrom.reset();
        this.router.navigate(['/home-dashboard/tarea']);
      }, error => Alerts.error('Error', 'Error al guardar la tarea', error));
    });
  }
  crearFormulario() {
    this.tareaFrom = this.fb.group({
      idTarea: [],
      titulo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: [],
      fechaCreacion: [],
      idEstadoTarea: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()],
      idUsuario: [0, CustomValidators.validarSeleccionOpcionPorDefectoValidator()]
    }, { validator: CustomValidators.dateRangeValidator() });
  }
  cargarCombos() {
    this.estadoTareaService.findAll().subscribe((estados: EstadoTarea[]) => {
      this.estadosTarea = estados;
    }, error => Alerts.error('Error', 'Error al cargar los estados de tarea', error));
    this.usuarioService.findAll().subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
    }, error => Alerts.error('Error', 'Error al cargar los usuarios', error));
  }
  private get tarea(): Tarea {
    let tarea = new Tarea();
    tarea.idTarea = this.tareaFrom.get('idTarea').value;
    tarea.titulo = this.tareaFrom.get('titulo').value;
    tarea.descripcion = this.tareaFrom.get('descripcion').value;
    tarea.fechaInicio = this.tareaFrom.get('fechaInicio').value;
    tarea.fechaFin = this.tareaFrom.get('fechaFin').value;
    tarea.fechaCreacion = Utils.isNullOrUndefined(this.tareaFrom.get('fechaCreacion').value)
      ? new Date()
      : this.tareaFrom.get('fechaCreacion').value;
    tarea.fechaModificacion = new Date();
    tarea.modificado = 'aa';
    tarea.idEstadoTarea = this.tareaFrom.get('idEstadoTarea').value;
    tarea.idUsuario = this.tareaFrom.get('idUsuario').value;
    return tarea;
  }

}
