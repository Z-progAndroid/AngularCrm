import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { MunicipioService } from 'src/app/services/municipio.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})
export class MunicipiosComponent {
  municipiosForm: FormGroup
  provincias: Provincia[]
  paises: Pais[]
  municipios: Municipo[]
  idMunicipioExistente: number = 0;
  constructor(
    private fb: FormBuilder,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService
  ) { }
  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarMunicipios();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Estas seguro de guardar el municipio?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Informacion', 'Operacion cancelada por el usuario');
        return;
      }
      this.municipioService.save(this.municipio).subscribe(data => {
        this.idMunicipioExistente = 0;
        this.municipiosForm.reset();
        this.cargarMunicipios();
      }, error => {
        this.municipiosForm.reset();
        Alerts.error('Error', 'No se pudo guardar la provincia', error);
      });
    });
  }
  ver(id: number) {
    this.municipioService.findById(id).subscribe((municipo: Municipo) => {
      this.municipiosForm.patchValue(municipo);
      this.municipiosForm.disable();
    }, error => {
      this.municipiosForm.reset();
      Alerts.error('Error', 'No se pudo cargar la municipo', error);
    });
  }
  editar(id: number) {
    this.municipioService.findById(id).subscribe((municipio: Municipo) => {
      this.idMunicipioExistente = id;
      this.municipiosForm.patchValue(municipio);
      this.municipiosForm.enable();
    }, error => {
      this.municipiosForm.reset();
      Alerts.error('Error', 'No se pudo cargar la municipio', error);
    });
  }
  eliminar(id: number) {
    Alerts.warning('Advertencia', '¿Estas seguro de eliminar el municipio?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Informacion', 'Operacion cancelada por el usuario');
        return;
      }
      this.municipioService.delete(id).subscribe((mensaje: any) => {
        Alerts.success('Exito', 'Se elimino el municipio correctamente');
        this.idMunicipioExistente = 0;
        this.municipiosForm.reset();
        this.cargarMunicipios();
      }, error => {
        this.municipiosForm.reset();
        Alerts.error('Error', 'No se pudo eliminar la provincia', error);
      });
    });
  }
  cargarFormulario() {
    this.municipiosForm = this.fb.group({
      idProvincia: ['', Validators.required],
      idMunicipio: ['', Validators.required],
      municipio: ['', Validators.required],
      fechaModificacion: ['']
    })
  }
  cargarMunicipios() {
    this.provincias = [];
    this.municipios = [];
    forkJoin([
      this.provinciaService.findAll(),
      this.municipioService.findAll()
    ]).subscribe(([provincias, municipios]) => {
      this.provincias = provincias;
      this.municipios = municipios;
    }, error => {
      this.municipiosForm.reset();
      Alerts.error('Error', 'No se pudo cargar la municipo', error);
    });
  }
  private get municipio(): Municipo {
    let municipio: Municipo = new Municipo();
    municipio.idMunicipioExistente= this.idMunicipioExistente;
    municipio.idMunicipio = this.municipiosForm.get('idMunicipio').value;
    municipio.municipio = this.municipiosForm.get('municipio').value;
    municipio.idProvincia = this.municipiosForm.get('idProvincia').value;
    municipio.fechaCreacion = new Date();
    municipio.fechaModificacion = Utils.isNullOrUndefined(this.municipiosForm.get('fechaModificacion').value)
      ? new Date()
      : this.municipiosForm.get('fechaModificacion').value;
    municipio.modificado = 'admin';
    return municipio;
  }
}
