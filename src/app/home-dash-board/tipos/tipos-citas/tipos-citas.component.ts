import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCita } from 'src/app/models/tipo-cita';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';

@Component({
  selector: 'app-tipos-citas',
  templateUrl: './tipos-citas.component.html',
  styleUrls: ['./tipos-citas.component.scss']
})
export class TiposCitasComponent {
  tipoCitaForm: FormGroup
  tipoCita: TipoCita[]
  constructor(
    private fb: FormBuilder,
    private tipoCitaService: TipoCitaService
  ) { }
  ngOnInit(): void {
    this.tipoCitaForm = this.fb.group({
      idTipoCita: ['', Validators.required],
      tipoCita: ['', Validators.required]
    });
    this.tipoCitaService.findAll().subscribe(tipoCita => this.tipoCita = tipoCita)
      , error => console.log(error);
  }
  submit() {
    let tipoCita: TipoCita = new TipoCita();
    tipoCita.idTipoCita = this.tipoCitaForm.get('idTipoCita').value;
    tipoCita.tipoCita = this.tipoCitaForm.get('tipoCita').value;
    tipoCita.fechaCreacion = new Date();
    tipoCita.fechaModificacion = new Date();
    tipoCita.modificado = 'admin';
    this.tipoCitaService.save(tipoCita).subscribe((tipoCita: TipoCita) => {
      this.tipoCitaService.findAll().subscribe(
        tipoCita => this.tipoCita = tipoCita
      ), error => console.log(error);
    }, error => console.log(error));

  }
  editar(id: number) {
    this.tipoCitaService.findById(id).subscribe(
      (tipoCita: TipoCita) => {
        this.tipoCitaForm.patchValue(tipoCita);
        this.tipoCitaForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.tipoCitaService.delete(id).subscribe(
      (mensaje: any) => {
        this.tipoCitaService.findAll().subscribe(
          tipoCita => this.tipoCita = tipoCita
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.tipoCitaService.findById(id).subscribe(
      (tipoCita: TipoCita) => {
        this.tipoCitaForm.patchValue(tipoCita);
        this.tipoCitaForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
