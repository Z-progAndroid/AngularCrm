import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoSeguimientos } from 'src/app/models/tipo-seguimientos';
import { TipoSeguimientosService } from 'src/app/services/tipo-seguimientos.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipo-seguimientos',
  templateUrl: './tipo-seguimientos.component.html',
  styleUrls: ['./tipo-seguimientos.component.scss']
})
export class TipoSeguimientosComponent {
  tipoSegiminetosForm: FormGroup
  tiposSeguimientos: TipoSeguimientos[]
  constructor(
    private fb: FormBuilder,
    private tipoSeguimientoService: TipoSeguimientosService
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarTipoSeguimientos();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Está seguro de guardar el tipo de seguimiento ?', 'Si,guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.tipoSegiminetosForm.reset();
          return;
        }
        this.tipoSeguimientoService.save(this.tipoSeguimiento).subscribe((tipoSeguimiento: TipoSeguimientos) => {
          Alerts.success('Exito', 'Tipo de seguimiento guardado correctamente');
          this.tipoSegiminetosForm.reset();
          this.cargarTipoSeguimientos();
        }, error => Alerts.error('Error', 'Error al guardar el tipo de seguimiento', error));
      });
  }
  editar(id: number) {
    this.tipoSeguimientoService.findById(id).subscribe(
      (tipoSeguimiento: TipoSeguimientos) => {
        this.tipoSegiminetosForm.patchValue(tipoSeguimiento);
        this.tipoSegiminetosForm.enable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de seguimiento', error));

  }
  eliminar(id: number) {
    Alerts.warning('Advertencia', '¿Está seguro de eliminar el tipo de seguimiento ?', 'Si,guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.tipoSegiminetosForm.reset();
          return;
        }
        this.tipoSeguimientoService.delete(id).subscribe(
          (mensaje: any) => {
            Alerts.success('Exito', 'Tipo de seguimiento eliminado correctamente');
            this.tipoSegiminetosForm.reset();
            this.cargarTipoSeguimientos();
          }, error => Alerts.error('Error', 'Error al eliminar el tipo de seguimiento', error));
      });
  }
  ver(id: number) {
    this.tipoSeguimientoService.findById(id).subscribe(
      (tipoSeguimiento: TipoSeguimientos) => {
        this.tipoSegiminetosForm.patchValue(tipoSeguimiento);
        this.tipoSegiminetosForm.disable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de seguimiento', error));
  }
  cargarTipoSeguimientos() {
    this.tipoSeguimientoService.findAll().subscribe(tipoSeguimiento => {
      this.tiposSeguimientos = tipoSeguimiento
    }, error => Alerts.error('Error', 'Error al cargar los tipos de seguimientos', error));
  }
  crearFormulario() {
    this.tipoSegiminetosForm = this.fb.group({
      idTipoSeguimiento: ['', Validators.required],
      tipoSeguimiento: ['', Validators.required],
      fechaCreacion: [''],
    });
  }
  private get tipoSeguimiento(): TipoSeguimientos {
    let tipoSeguimiento: TipoSeguimientos = new TipoSeguimientos();
    tipoSeguimiento.idTipoSeguimiento = this.tipoSegiminetosForm.get('idTipoSeguimiento').value;
    tipoSeguimiento.tipoSeguimiento = this.tipoSegiminetosForm.get('tipoSeguimiento').value;
    tipoSeguimiento.fechaCreacion = Utils.isNullOrUndefined(this.tipoSegiminetosForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoSegiminetosForm.get('fechaCreacion').value;
    tipoSeguimiento.fechaModificacion = new Date();
    tipoSeguimiento.modificado = 'admin';
    return tipoSeguimiento;
  }
}
