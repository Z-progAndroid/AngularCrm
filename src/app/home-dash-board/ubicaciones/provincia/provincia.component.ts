import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { forkJoin } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { Alerts } from 'src/app/utils/Alerts';
import { TableColumn } from 'src/app/interfaces/table-column';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent {
  provinciasForm: FormGroup
  provincias: Provincia[]
  paises: Pais[]
  idProvinciaExistente: number = null;
  tableColumns: TableColumn[] = [
    { name: 'Pais', dataKey: 'idPais'},
    { name: 'Codigo', dataKey: 'idProvincia'},
    { name: 'Provincia', dataKey: 'provincia'}
  ];
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarProvincias();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Está seguro de guardar los cambios?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.provinciaService.save(this.getProvincia).subscribe(data => {
        Alerts.success('Exito', 'Provincia guardada con éxito');
        this.idProvinciaExistente = 0;
        this.provinciasForm.reset();
        this.cargarProvincias();
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo guardar la provincia', error);
      });
    });
  }
  crearFormulario() {
    this.provinciasForm = this.fb.group({
      idPais: ['', Validators.required],
      idProvincia: ['', Validators.required],
      provincia: ['', Validators.required],
      fechaModificacion: ['']
    })
  }
  cargarProvincias() {
    this.provincias = [];
    this.provinciaService.findAll().subscribe(data => {
      this.provincias = data;
    }, error => {
      Alerts.error('Error', 'No se pudo cargar las provincias', error);
    });
    this.paises = [];
    this.paisService.findAll().subscribe(data => {
      this.paises = data;
    }, error => {
      Alerts.error('Error', 'No se pudo cargar los paises', error);
    });
  }
  private get getProvincia(): Provincia {
    let provincia: Provincia = new Provincia();
    provincia.idProvinciaExistente = this.idProvinciaExistente;
    provincia.idPais = this.provinciasForm.get('idPais').value;
    provincia.idProvincia = this.provinciasForm.get('idProvincia').value;
    provincia.provincia = this.provinciasForm.get('provincia').value;
    provincia.fechaModificacion = Utils.isFormEmpty(this.provinciasForm.get('fechaModificacion').value)
      ? new Date()
      : this.provinciasForm.get('fechaModificacion').value;
    provincia.fechaCreacion = new Date();
    provincia.modificado = this.authService.getUsername();
    return provincia;
  }
  delete($event) {
    Alerts.warning('Advertencia', '¿Está seguro de elimninar los cambios?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.provinciaService.delete($event.idProvincia).subscribe((mensaje: any) => {
        Alerts.success('Exito', 'Provincia eliminada con éxito');
        this.idProvinciaExistente = 0;
        this.cargarProvincias();
        this.provinciasForm.reset();
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo eliminar la provincia', error);
      });
    });
  }
  export($event) {
    this.provinciaService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'procincias.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.provinciaService.findById($event.idProvincia).subscribe(
      (provincia: Provincia) => {
        this.idProvinciaExistente = $event.idProvincia;
        this.provinciasForm.patchValue(provincia);
        this.provinciasForm.enable();
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo cargar la provincia', error);
      });
  }
}
