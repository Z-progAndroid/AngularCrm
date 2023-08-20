import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { TipoPago } from 'src/app/models/tipo-pago';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipo-pagos',
  templateUrl: './tipo-pagos.component.html',
  styleUrls: ['./tipo-pagos.component.scss']
})
export class TipoPagosComponent {
  tipoPagoForm: FormGroup
  tiposPagos: TipoPago[]
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'idTipoPago' },
    { name: 'Tipo', dataKey: 'tipo', }
  ];
  constructor(
    private fb: FormBuilder,
    private tipoPagoService: TipoPagoService
  ) { }
  ngOnInit(): void {
    this.crearFromulario();
    this.cargarTipoPagos();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Está seguro de guardar el tipo de pago ?', 'Si,guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          this.tipoPagoForm.reset();
          return;
        }
        this.tipoPagoService.save(this.tipoPago).subscribe((tipoPago: TipoPago) => {
          Alerts.success('Operación exitosa', 'Tipo de pago guardado con éxito');
          this.tipoPagoForm.reset();
          this.cargarTipoPagos();
        }, error => Alerts.error('Error', 'Error al guardar el tipo de pago', error));
      });
  }
  crearFromulario() {
    this.tipoPagoForm = this.fb.group({
      idTipoPago: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaCreacion: [''],
    });
  }
  cargarTipoPagos() {
    this.tipoPagoService.findAll().subscribe(tipoPago => {
      this.tiposPagos = tipoPago
    }, error => Alerts.error('Error', 'Error al cargar los tipos de pagos', error));
  }
  private get tipoPago(): TipoPago {
    let tipoPago: TipoPago = new TipoPago();
    tipoPago.idTipoPago = this.tipoPagoForm.get('idTipoPago').value;
    tipoPago.tipo = this.tipoPagoForm.get('tipo').value;
    tipoPago.fechaCreacion = Utils.isNullOrUndefined(this.tipoPagoForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoPagoForm.get('fechaCreacion').value;
    tipoPago.fechaModificacion = new Date();
    tipoPago.modificado = 'admin';
    return tipoPago;
  }
  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro de eliminar el tipo de pago ?', 'Si,guardar')
    .then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        this.tipoPagoForm.reset();
        return;
      }
      this.tipoPagoService.delete($event.idTipoPago).subscribe((mensaje: any) => {
        Alerts.success('Operación exitosa', 'Tipo de pago eliminado con éxito');
        this.tipoPagoForm.reset();
        this.cargarTipoPagos();
      }, error => Alerts.error('Error', 'Error al eliminar el tipo de pago', error));
    });
  }
  export($event) {
    this.tipoPagoService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'tipo-pago.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.tipoPagoService.findById($event.idTipoPago).subscribe(
      (tipoPago: TipoPago) => {
        this.tipoPagoForm.patchValue(tipoPago);
        this.tipoPagoForm.enable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de pago', error));

  }

}
