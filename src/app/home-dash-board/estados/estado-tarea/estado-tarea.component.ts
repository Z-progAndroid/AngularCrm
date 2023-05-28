import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { EstadoTarea } from 'src/app/models/estado-tarea';
import { EstadoTareaService } from 'src/app/services/estado-tarea.service';

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
    this.estadoTareaForm = this.fb.group({
      idEstadoTarea: ['', Validators.required],
      estadoTarea: ['', Validators.required]
    });
    this.tareaEstadosService.findAll().subscribe(
      estadosTarea => this.estadosTarea = estadosTarea
    ), error => console.log(error);
  }
  submit() {
    let estadoTarea: EstadoTarea = Object.assign({}, this.estadoTareaForm.value);
    estadoTarea.fechaCreacion = new Date();
    estadoTarea.fechaModificacion = new Date();
    estadoTarea.modificado = 'admin';
    console.log(estadoTarea);
    this.tareaEstadosService.save(estadoTarea).subscribe(
      (estadoTarea: EstadoTarea) => {
        console.log(estadoTarea);
        this.tareaEstadosService.findAll().subscribe(
          estadosTarea => this.estadosTarea = estadosTarea
        ), error => console.log(error);
      }, error => console.log(error));
  }
  ver(id: number) {
    this.tareaEstadosService.findById(id).subscribe(
      (estadoTarea: EstadoTarea) => {
        this.estadoTareaForm.patchValue(estadoTarea);
        this.estadoTareaForm.disable();
      }
    ), error => console.log(error);

  }
  editar(id: number) {
    this.tareaEstadosService.findById(id).subscribe(
      (estadoTarea: EstadoTarea) => {
        this.estadoTareaForm.patchValue(estadoTarea);
        this.estadoTareaForm.enable();
      }
    ), error => console.log(error);
  }
  eliminar(id: number) {
    this.tareaEstadosService.delete(id).subscribe(
      (mensaje: any) => {
        this.estadosTarea = [];
        console.log(mensaje);
        this.tareaEstadosService.findAll().subscribe(estadosTarea => this.estadosTarea = estadosTarea)
          , error => console.log(error);
      });
  }
}
