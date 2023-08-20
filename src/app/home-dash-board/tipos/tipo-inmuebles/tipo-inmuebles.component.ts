import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-tipo-inmuebles',
  templateUrl: './tipo-inmuebles.component.html',
  styleUrls: ['./tipo-inmuebles.component.scss']
})
export class TipoInmueblesComponent {
  tipoInmueblesForm: FormGroup
  tiposInmuebles: TipoInmueble[]
  constructor(
    private fb: FormBuilder,
    private tipoInmuebleService: TipoInmuebleService
  ) { }
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'id' },
    { name: 'Estado', dataKey: 'tipo', }
  ];
  ngOnInit(): void {
    this.crearFromulario();
    this.cargarTipoInmuebles();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Está seguro de guardar el tipo de inmueble?', 'Si,guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por el usuario');
          return;
        }
        this.tipoInmuebleService.save(this.tipoInmueble).subscribe((tipoInmueble: TipoInmueble) => {
          Alerts.success('Operación exitosa', 'Tipo de inmueble guardado con éxito');
          this.tipoInmueblesForm.reset();
          this.cargarTipoInmuebles();
        }, error => Alerts.error('Error', 'Error al guardar el tipo de inmueble', error));
      });

  }
  crearFromulario() {
    this.tipoInmueblesForm = this.fb.group({
      id: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
  cargarTipoInmuebles() {
    this.tipoInmuebleService.findAll().subscribe(tipoInmueble => {
      this.tiposInmuebles = tipoInmueble;
    }, error => Alerts.error('Error', 'Error al cargar los tipos de inmuebles', error));
  }
  private get tipoInmueble(): TipoInmueble {
    let tipoInmueble: TipoInmueble = new TipoInmueble();
    tipoInmueble.id = this.tipoInmueblesForm.get('id').value;
    tipoInmueble.tipo = this.tipoInmueblesForm.get('tipo').value;
    tipoInmueble.fechaCreacion = Utils.isNullOrUndefined(this.tipoInmueblesForm.get('fechaCreacion').value)
      ? new Date()
      : this.tipoInmueblesForm.get('fechaCreacion').value;
    tipoInmueble.fechaModificacion = new Date();
    tipoInmueble.modificado = 'admin';
    return tipoInmueble;
  }
  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro de guardar el tipo de inmueble?', 'Si,guardar')
    .then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.tipoInmuebleService.delete($event.id).subscribe(
        (mensaje: any) => {
          Alerts.success('Operación exitosa', 'Tipo de inmueble eliminado con éxito');
          this.tipoInmueblesForm.reset();
          this.cargarTipoInmuebles();
        }, error => Alerts.error('Error', 'Error al eliminar el tipo de inmueble', error));
    });
  }
  export($event) {
    this.tipoInmuebleService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'tipo-inmuebles.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.tipoInmuebleService.findById($event.id).subscribe(
      (tipoInmueble: TipoInmueble) => {
        this.tipoInmueblesForm.patchValue(tipoInmueble);
        this.tipoInmueblesForm.enable();
      }, error => Alerts.error('Error', 'Error al cargar el tipo de inmueble', error));
  }
}
