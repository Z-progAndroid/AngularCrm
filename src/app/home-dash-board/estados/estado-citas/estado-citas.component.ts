import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { EstadoCitasService } from 'src/app/services/estado-citas.service';

@Component({
  selector: 'app-estado-citas',
  templateUrl: './estado-citas.component.html',
  styleUrls: ['./estado-citas.component.scss']
})
export class EstadoCitasComponent implements OnInit {
  estadoCitasForm: FormGroup
  estadosCita: EstadoCitas[]
  constructor(
    private fb: FormBuilder,
    private estadoCitasService: EstadoCitasService
  ) { }
  ngOnInit(): void {
    this.estadoCitasForm = this.fb.group({
      idEstadoCita: ['', Validators.required],
      estadoCita: ['', Validators.required],
    })
    this.estadoCitasService.findAll().subscribe(data => {
      this.estadosCita = data
    }), error => console.log(error);
  }
  submit() {
    let estadoCita: EstadoCitas = new EstadoCitas();
    estadoCita = Object.assign({}, this.estadoCitasForm.value);
    estadoCita.fechaCreacion = new Date();
    estadoCita.fechaModificacion = new Date();
    estadoCita.modificado = 'admin';
    this.estadoCitasService.save(estadoCita).subscribe(data => {
      this.estadoCitasForm.reset();
      this.ngOnInit();
    }), error => console.log(error);

  }
  ver(id: number) {
    this.estadoCitasService.findById(id).subscribe(
      (estadoCita: EstadoCitas) => {
        this.estadoCitasForm.patchValue(estadoCita);
        this.estadoCitasForm.disable();
      }), error => console.log(error);
  }
  editar(id: number) {
    this.estadoCitasService.findById(id).subscribe(
      (estadoCita: EstadoCitas) => {
        this.estadoCitasForm.patchValue(estadoCita);
        this.estadoCitasForm.enable();
      }), error => console.log(error);
  }
  eliminar(id: number) {
    this.estadoCitasService.delete(id).subscribe(
      (mensaje: any) => {
        console.log(mensaje);
        this.ngOnInit();
      }), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }  
}
