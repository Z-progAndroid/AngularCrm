import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPago } from 'src/app/models/tipo-pago';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';

@Component({
  selector: 'app-tipo-pagos',
  templateUrl: './tipo-pagos.component.html',
  styleUrls: ['./tipo-pagos.component.scss']
})
export class TipoPagosComponent {
  tipoPagoForm: FormGroup
  tipoPago: TipoPago []
  constructor(
    private fb: FormBuilder,
    private tipoPagoService: TipoPagoService
  ) { }
  ngOnInit(): void {
    this.tipoPagoForm = this.fb.group({
      idTipoPago: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.tipoPagoService.findAll().subscribe(tipoPago => this.tipoPago = tipoPago)
      , error => console.log(error);
  }
  submit() {
    let tipoPago: TipoPago=new TipoPago();
    tipoPago.idTipoPago = this.tipoPagoForm.get('idTipoPago').value;
    tipoPago.tipo = this.tipoPagoForm.get('tipo').value;
    tipoPago.fechaCreacion = new Date();
    tipoPago.fechaModificacion = new Date();
    tipoPago.modificado = 'admin';
    this.tipoPagoService.save(tipoPago).subscribe((tipoPago: TipoPago) => {
        this.tipoPagoService.findAll().subscribe(
          tipoPago => this.tipoPago = tipoPago
        ), error => console.log(error);
      }, error => console.log(error));

  }
  editar(id: number) {
    this.tipoPagoService.findById(id).subscribe(
      (tipoPago: TipoPago) => {
        this.tipoPagoForm.patchValue(tipoPago);
        this.tipoPagoForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.tipoPagoService.delete(id).subscribe(
      (mensaje: any) => {
        this.tipoPagoService.findAll().subscribe(
          tipoPago => this.tipoPago = tipoPago
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.tipoPagoService.findById(id).subscribe(
      (tipoPago: TipoPago) => {
        this.tipoPagoForm.patchValue(tipoPago);
        this.tipoPagoForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }

}
