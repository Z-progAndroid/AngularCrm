import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCita } from 'src/app/models/tipo-cita';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipos-citas',
  templateUrl: './tipos-citas.component.html',
  styleUrls: ['./tipos-citas.component.scss']
})
export class TiposCitasComponent {
  tipoCitaForm: FormGroup
  tiposCitas: TipoCita[]
  constructor(
    private fb: FormBuilder,
    private tipoCitaService: TipoCitaService
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarTiposCita();
  }
  submit() {
    Alerts.warning('Avertencia', '¿Está seguro de guardar el tipo de cita?', 'Si, guardar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        this.tipoCitaForm.reset();
        return;
      }
      this.tipoCitaService.save(this.tipoCita).subscribe((tipoCita: TipoCita) => {
        Alerts.success('Operación exitosa', 'El tipo de cita se ha guardado correctamente');
        this.tipoCitaForm.reset();
        this.cargarTiposCita();
      }, error => Alerts.error('Error', 'Error al guardar el tipo de cita', error));
    });
  }
  editar(id: number) {
    this.tipoCitaService.findById(id).subscribe(
      (tipoCita: TipoCita) => {
        this.tipoCitaForm.patchValue(tipoCita);
        this.tipoCitaForm.enable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de cita', error));

  }
  eliminar(id: number) {
    Alerts.warning('Avertencia', '¿Está seguro de guardar el tipo de cita?', 'Si, guardar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        this.tipoCitaForm.reset();
        return;
      }
      this.tipoCitaService.delete(id).subscribe((mensaje: any) => {
        Alerts.success('Operación exitosa', 'El tipo de cita se ha eliminado correctamente');
        this.tipoCitaForm.reset();
        this.cargarTiposCita();
      }, error => Alerts.error('Error', 'Error al eliminar el tipo de cita', error));
    });
  }
  ver(id: number) {
    this.tipoCitaService.findById(id).subscribe(
      (tipoCita: TipoCita) => {
        this.tipoCitaForm.patchValue(tipoCita);
        this.tipoCitaForm.disable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de cita', error));
  }
  crearFormulario() {
    this.tipoCitaForm = this.fb.group({
      idTipoCita: ['', Validators.required],
      tipoCita: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
  cargarTiposCita() {
    this.tipoCitaService.findAll().subscribe(tipoCita => {
      this.tiposCitas = tipoCita
    }, error => Alerts.error('Error', 'Error al cargar los tipos de citas', error));
  }
  private get tipoCita(): TipoCita {
    let tipoCita: TipoCita = new TipoCita();
    tipoCita.idTipoCita = this.tipoCitaForm.get('idTipoCita').value;
    tipoCita.tipoCita = this.tipoCitaForm.get('tipoCita').value;
    tipoCita.fechaCreacion = Utils.isNullOrUndefined(this.tipoCitaForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoCitaForm.get('fechaCreacion').value;
    tipoCita.fechaModificacion = new Date();
    tipoCita.modificado = 'admin';
    return tipoCita;
  }
}
