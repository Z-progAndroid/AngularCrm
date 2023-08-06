import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { forkJoin } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { Alerts } from 'src/app/utils/Alerts';
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
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private provinciaService: ProvinciaService
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
  ver(id: number) {
    this.provinciaService.findById(id).subscribe(
      (provincia: Provincia) => {
        this.provinciasForm.patchValue(provincia);
        this.provinciasForm.disable();
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo cargar la provincia', error);
      });
  }
  editar(id: number) {
    this.provinciaService.findById(id).subscribe(
      (provincia: Provincia) => {
        this.idProvinciaExistente = id;
        this.provinciasForm.patchValue(provincia);
        this.provinciasForm.enable();
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo cargar la provincia', error);
      });
  }
  eliminar(id: number) {
    Alerts.warning('Advertencia', '¿Está seguro de elimninar los cambios?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Información', 'Operación cancelada por el usuario');
        return;
      }
      this.provinciaService.delete(id).subscribe((mensaje: any) => {
        Alerts.success('Exito', 'Provincia eliminada con éxito');
        this.idProvinciaExistente = 0;
      }, error => {
        this.provinciasForm.reset();
        Alerts.error('Error', 'No se pudo eliminar la provincia', error);
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
    forkJoin([
      this.paisService.findAll(),
      this.provinciaService.findAll()
    ]).subscribe(([paises, provincias]) => {
      this.paises = paises;
      this.provincias = provincias;
    }, error => {
      this.provinciasForm.reset();
      Alerts.error('Error', 'No se pudo cargar las provincias', error);
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
    provincia.modificado = 'admin';
    return provincia;
  }
}
