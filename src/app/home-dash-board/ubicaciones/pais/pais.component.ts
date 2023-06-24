import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { Pais } from 'src/app/models/pais';

import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent {
  paisForm: FormGroup
  paises: Pais[]
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService
  ) { }
  ngOnInit(): void {
    this.paisForm = this.fb.group({
      idPais: ['', Validators.required],
      pais: ['', Validators.required],
    })
    this.paisService.findAll().subscribe(data => {
      this.paises = data
    }), error => console.log(error);
  }
  submit() {
    let pais: Pais = new Pais();
    pais = Object.assign({}, this.paisForm.value);
    pais.fechaCreacion = new Date();
    pais.fechaModificacion = new Date();
    pais.modificado = 'admin';
    this.paisService.save(pais).subscribe(data => {
      this.paisForm.reset();
      this.ngOnInit();
    }), error => console.log(error);

  }
  ver(id: number) {
    this.paisService.findById(id).subscribe(
      (estadoCita: Pais) => {
        this.paisForm.patchValue(estadoCita);
        this.paisForm.disable();
      }), error => console.log(error);
  }
  editar(id: number) {
    this.paisService.findById(id).subscribe(
      (estadoCita: Pais) => {
        this.paisForm.patchValue(estadoCita);
        this.paisForm.enable();
      }), error => console.log(error);
  }
  eliminar(id: number) {
    this.paisService.delete(id).subscribe(
      (mensaje: any) => {
        console.log(mensaje);
        this.ngOnInit();
      }), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
