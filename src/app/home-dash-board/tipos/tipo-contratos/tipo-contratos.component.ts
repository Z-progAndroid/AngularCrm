import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipo-contratos',
  templateUrl: './tipo-contratos.component.html',
  styleUrls: ['./tipo-contratos.component.scss']
})
export class TipoContratosComponent {
  tipoContratoForm: FormGroup
  tiposContratos: TipoContrato[]
  constructor(
    private fb: FormBuilder,
    private tipoContratoService: TipoContratoService
  ) { }
  ngOnInit(): void {
    this.creacionFormulario();
    this.cargarTiposContrato();
  }
  submit() {
    Alerts.warning('Avertencia', '¿Está seguro de guardar el tipo de contrato?', 'Aceptar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tipoContratoService.save(this.tipoContrato).subscribe((tipoContrato: TipoContrato) => {
        Alerts.success('Operación exitosa', 'El tipo de contrato se ha guardado correctamente');
        this.cargarTiposContrato();
        this.tipoContratoForm.reset();
      }, error => Alerts.error('Error', 'No se ha podido guardar el tipo de contrato', error));
    });
  }
  editar(id: number) {
    this.tipoContratoService.findById(id).subscribe((tipoContrato: TipoContrato) => {
      this.tipoContratoForm.patchValue(tipoContrato);
      this.tipoContratoForm.enable();
    }, error => Alerts.error('Error', 'No se ha podido cargar el tipo de contrato', error));

  }
  eliminar(id: number) {
    Alerts.warning('Avertencia', '¿Está seguro de eliminar el tipo de contrato?', 'Aceptar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tipoContratoService.delete(id).subscribe((mensaje: any) => {
        Alerts.success('Operación exitosa', 'El tipo de contrato se ha eliminado correctamente');
        this.cargarTiposContrato();
        this.tipoContratoForm.reset();
      }, error => Alerts.error('Error', 'No se ha podido eliminar el tipo de contrato', error));
    });
  }
  ver(id: number) {
    this.tipoContratoService.findById(id).subscribe(
      (tipoContrato: TipoContrato) => {
        this.tipoContratoForm.patchValue(tipoContrato);
        this.tipoContratoForm.disable();
      }, error => Alerts.error('Error', 'No se ha podido cargar el tipo de contrato', error));
  }
  creacionFormulario() {
    this.tipoContratoForm = this.fb.group({
      idTipoContrato: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
  cargarTiposContrato() {
    this.tipoContratoService.findAll().subscribe((tipoContrato: TipoContrato[]) => {
      this.tiposContratos = tipoContrato
    }, error => console.log(error));
  }
  private get tipoContrato() {
    let tipoContrato: TipoContrato = new TipoContrato();
    tipoContrato.idTipoContrato = this.tipoContratoForm.get('idTipoContrato').value;
    tipoContrato.tipo = this.tipoContratoForm.get('tipo').value;
    tipoContrato.fechaCreacion = Utils.isNullOrUndefined(this.tipoContratoForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoContratoForm.get('fechaCreacion').value;
    tipoContrato.fechaModificacion = new Date();
    tipoContrato.modificado = 'admin';
    return tipoContrato;
  }
}
