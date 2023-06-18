import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { EstadoTarea } from 'src/app/models/estado-tarea';
import { Mensaje } from 'src/app/models/mensaje';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';
import { Alerts } from 'src/app/utils/Alerts';


@Component({
  selector: 'app-estado-tarea',
  templateUrl: './estado-tarea.component.html',
  styleUrls: ['./estado-tarea.component.scss']
})
export class EstadoTareaComponent implements OnInit {
  estadoTareaForm: FormGroup
  estadosTarea: EstadoTarea[]
  constructor(
    private fb: FormBuilder
    , private tareaEstadosService: EstadoTareaService) { }

  ngOnInit(): void {
    this.crearFromulario();
    this.cargarEstadosTarea();
  }


  submit() {
    Alerts.warning("Advertencia", "¿Está seguro que desea guardar el estado de tarea?", "Si, guardar")
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadoTareaForm.reset();
          return;
        }
        let estadoTarea: EstadoTarea = Object.assign({}, this.estadoTareaForm.value);
        estadoTarea.fechaModificacion = new Date();
        estadoTarea.modificado = 'admin';
        this.tareaEstadosService.save(estadoTarea).subscribe(() => {
          Alerts.success("Exito", "Estado de tarea guardado correctamente").then(() => this.cargarEstadosTarea());
        }, (error) => Alerts.error("Error", "No se pudo guardar el estado de tarea", error));
      });
  }
  ver(id: number) {
    this.tareaEstadosService.findById(id).subscribe(
      (estadoTarea: EstadoTarea) => {
        this.estadoTareaForm.patchValue(estadoTarea);
        this.estadoTareaForm.disable();
      }
    ), (error) => Alerts.error("Error", "No se pudo cargar el estado de tarea", error);

  }
  editar(id: number) {
    this.tareaEstadosService.findById(id).subscribe(
      (estadoTarea: EstadoTarea) => {
        this.estadoTareaForm.patchValue(estadoTarea);
        this.estadoTareaForm.enable();
      }
    ), (error) => Alerts.error("Error", "No se pudo cargar el estado de tarea", error);
  }
  eliminar(id: number) {
    Alerts.warning("Advertencia", "¿Está seguro que desea eliminar el estado de tarea?", "Si, eliminar")
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.estadoTareaForm.reset();
          return;
        }
        this.tareaEstadosService.delete(id).subscribe((mensaje: Mensaje) => {
          Alerts.success("Exito", "Se borrado correctamente el estado de la tarea").then(() => this.cargarEstadosTarea());
        });

      });
  }
  cargarEstadosTarea() {
    this.estadoTareaForm.reset();
    this.tareaEstadosService.findAll().subscribe(estadosTarea => this.estadosTarea = estadosTarea), (error) => {
      this.estadosTarea = [];
      Alerts.error("Error", "No se pudo cargar la lista de estados de tarea", error);
    };
  }
  crearFromulario() {
    this.estadoTareaForm = this.fb.group({
      idEstadoTarea: ['', Validators.required],
      estadoTarea: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
}
