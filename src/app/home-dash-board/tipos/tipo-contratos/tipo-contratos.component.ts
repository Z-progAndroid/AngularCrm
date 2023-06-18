import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';

@Component({
  selector: 'app-tipo-contratos',
  templateUrl: './tipo-contratos.component.html',
  styleUrls: ['./tipo-contratos.component.scss']
})
export class TipoContratosComponent {
  tipoContratoForm: FormGroup
  tipoContrato: TipoContrato []
  constructor(
    private fb: FormBuilder,
    private tipoContratoService: TipoContratoService
  ) { }
  ngOnInit(): void {
    this.tipoContratoForm = this.fb.group({
      idTipoContrato: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.tipoContratoService.findAll().subscribe(tipoContrato => this.tipoContrato = tipoContrato)
      , error => console.log(error);
  }
  submit() {
    let tipoContrato: TipoContrato = Object.assign({}, this.tipoContratoForm.value);
    tipoContrato.fechaCreacion = new Date();
    tipoContrato.fechaModificacion = new Date();
    tipoContrato.modificado = 'admin';
    this.tipoContratoService.save(tipoContrato).subscribe((tipoContrato: TipoContrato) => {
        this.tipoContratoService.findAll().subscribe(
          tipoContrato => this.tipoContrato = tipoContrato
        ), error => console.log(error);
      }, error => console.log(error));

  }
  editar(id: number) {
    this.tipoContratoService.findById(id).subscribe(
      (tipoContrato: TipoContrato) => {
        this.tipoContratoForm.patchValue(tipoContrato);
        this.tipoContratoForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.tipoContratoService.delete(id).subscribe(
      (mensaje: any) => {
        this.tipoContratoService.findAll().subscribe(
          tipoContrato => this.tipoContrato = tipoContrato
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.tipoContratoService.findById(id).subscribe(
      (tipoContrato: TipoContrato) => {
        this.tipoContratoForm.patchValue(tipoContrato);
        this.tipoContratoForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
