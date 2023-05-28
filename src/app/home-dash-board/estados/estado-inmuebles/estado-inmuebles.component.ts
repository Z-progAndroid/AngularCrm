import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { EstadoInmueble } from 'src/app/models/estado-inmueble';
import { Inmueble } from 'src/app/models/inmueble';
import { EstadoInmuebleService } from 'src/app/services/estado-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-estado-inmuebles',
  templateUrl: './estado-inmuebles.component.html',
  styleUrls: ['./estado-inmuebles.component.scss']
})
export class EstadoInmueblesComponent {
  estadoInmuebleForm: FormGroup
  estadosInmueble: EstadoInmueble[]
  constructor(
    private fb: FormBuilder
    , private inmuebleEstados: EstadoInmuebleService
    , private inmuebleService: InmuebleService) { }

  ngOnInit(): void {
    this.estadoInmuebleForm = this.fb.group({
      idEstadoInmueble: ['', Validators.required],
      estadoInmueble: ['', Validators.required],
    })
    this.inmuebleEstados.findAll().subscribe((data) => this.estadosInmueble = data)
    ,(error) => console.log('error', error)
  }
  submit() {
    let estadoInmueble: EstadoInmueble = new EstadoInmueble(); // Crear instancia del objeto estadoInmueble
    estadoInmueble.idEstadoInmueble = this.estadoInmuebleForm.get('idEstadoInmueble').value
    estadoInmueble.estado = this.estadoInmuebleForm.get('estadoInmueble').value
    estadoInmueble.fechaCreacion = new Date()
    estadoInmueble.fechaModificacion = new Date()
    estadoInmueble.modificado = 'admin'
    this.inmuebleEstados.save(estadoInmueble).subscribe(
      (data) => {
        this.estadoInmuebleForm.reset()
        this.inmuebleEstados.findAll().subscribe(
          (data) => {
            this.estadosInmueble = data
          }, error => console.log('error', error));
      }, error => console.log('error', error));
  }
  eliminar(id: number) {
    this.inmuebleEstados.delete(id).subscribe(
      (data) => {
        this.inmuebleEstados.findAll().subscribe(
          (data) => {
            this.estadosInmueble = data
          }, error => console.log('error', error));
      }, error => console.log('error', error));

  }
  editar(id: number) {
    this.inmuebleEstados.findById(id).subscribe(
      (data) => {
        this.estadoInmuebleForm.get('idEstadoInmueble').setValue(data.idEstadoInmueble)
        this.estadoInmuebleForm.get('estadoInmueble').setValue(data.estado)
      });

  }
  ver(id: number) {
    this.inmuebleEstados.findById(id).subscribe(
      (data) => {
        this.estadoInmuebleForm.get('idEstadoInmueble').setValue(data.idEstadoInmueble)
        this.estadoInmuebleForm.get('estadoInmueble').setValue(data.estado)
        this.estadoInmuebleForm.disable();
      });
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }  
}
