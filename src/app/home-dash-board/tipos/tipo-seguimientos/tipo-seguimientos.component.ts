import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoSeguimientos } from 'src/app/models/tipo-seguimientos';
import { TipoSeguimientosService } from 'src/app/services/tipo-seguimientos.service';

@Component({
  selector: 'app-tipo-seguimientos',
  templateUrl: './tipo-seguimientos.component.html',
  styleUrls: ['./tipo-seguimientos.component.scss']
})
export class TipoSeguimientosComponent {
  tipoSegiminetosForm: FormGroup
  tipoSeguimiento: TipoSeguimientos []
  constructor(
    private fb: FormBuilder,
    private tipoSeguimientoService: TipoSeguimientosService
  ) { }
  ngOnInit(): void {
    this.tipoSegiminetosForm = this.fb.group({
      idTipoSeguimiento: ['', Validators.required],
      tipoSeguimiento: ['', Validators.required]
    });
    this.tipoSeguimientoService.findAll().subscribe(tipoSeguimiento => this.tipoSeguimiento = tipoSeguimiento)
      , error => console.log(error);
  }
  submit() {
    let tipoSeguimiento: TipoSeguimientos=new TipoSeguimientos();
    tipoSeguimiento.idTipoSeguimiento = this.tipoSegiminetosForm.get('idTipoSeguimiento').value;
    tipoSeguimiento.tipoSeguimiento = this.tipoSegiminetosForm.get('tipoSeguimiento').value;
    tipoSeguimiento.fechaCreacion = new Date();
    tipoSeguimiento.fechaModificacion = new Date();
    tipoSeguimiento.modificado = 'admin';
    this.tipoSeguimientoService.save(tipoSeguimiento).subscribe((tipoSeguimiento: TipoSeguimientos) => {
        this.tipoSeguimientoService.findAll().subscribe(
          tipoSeguimiento => this.tipoSeguimiento = tipoSeguimiento
        ), error => console.log(error);
      }, error => console.log(error));

  }
  editar(id: number) {
    this.tipoSeguimientoService.findById(id).subscribe(
      (tipoSeguimiento: TipoSeguimientos) => {
        this.tipoSegiminetosForm.patchValue(tipoSeguimiento);
        this.tipoSegiminetosForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.tipoSeguimientoService.delete(id).subscribe(
      (mensaje: any) => {
        this.tipoSeguimientoService.findAll().subscribe(
          tipoSeguimiento => this.tipoSeguimiento = tipoSeguimiento
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.tipoSeguimientoService.findById(id).subscribe(
      (tipoSeguimiento: TipoSeguimientos) => {
        this.tipoSegiminetosForm.patchValue(tipoSeguimiento);
        this.tipoSegiminetosForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
