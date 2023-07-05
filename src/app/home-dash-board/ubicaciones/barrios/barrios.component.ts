import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Barrio } from 'src/app/models/barrio';
import { Municipo } from 'src/app/models/municipo';
import { BarrioService } from 'src/app/services/barrio.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styleUrls: ['./barrios.component.scss']
})
export class BarriosComponent {
  barrioForm: FormGroup
  municipios: Municipo[]
  barrios: Barrio[]
  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private barrioService: BarrioService
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarMunicipios();
  }
  submit() {
    Alerts.warning('Advertencia', '¿Estas seguro de guardar el barrio?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Informacion', 'Operacion cancelada por el usuario');
        return;
      }
      this.barrioService.save(this.barrio).subscribe(data => {
        Alerts.success('Exito', 'Barrio guardado correctamente');
        this.barrioForm.reset();
        this.cargarMunicipios();
      }, error => {
        this.barrioForm.reset();
        Alerts.error('Error', 'No se pudo guardar el barrio', error);
      });
    });

  }
  ver(id: number) {
    this.barrioService.findById(id).subscribe((barrio: Barrio) => {
      this.barrioForm.patchValue(barrio);
      this.barrioForm.disable();
    }, error => {
      this.barrioForm.reset();
      Alerts.error('Error', 'No se pudo cargar el barrio', error);
    });
  }
  editar(id: number) {
    this.barrioService.findById(id).subscribe((barrio: Barrio) => {
      this.barrioForm.patchValue(barrio);
      this.barrioForm.enable();
    }, error => {
      this.barrioForm.reset();
      Alerts.error('Error', 'No se pudo cargar el barrio', error);
    });
  }
  eliminar(id: number) {
    Alerts.warning('Advertencia', '¿Estas seguro de eliminar el barrio?', 'Confirmar').then((result) => {
      if (!result.isConfirmed) {
        Alerts.info('Informacion', 'Operacion cancelada por el usuario');
        return;
      }
      this.barrioService.delete(id).subscribe((mensaje: any) => {
        Alerts.success('Exito', 'Barrio eliminado correctamente');
        this.cargarMunicipios();
      }, error => {
        this.barrioForm.reset();
        Alerts.error('Error', 'No se pudo eliminar el barrio', error);
      });
    });
  }
  crearFormulario() {
    this.barrioForm = this.fb.group({
      idMunicipio: ['', Validators.required],
      idBarrio: ['', Validators.required],
      barrio: ['', Validators.required],
      fechaModificacion: ['']
    })
  }
  cargarMunicipios() {
    this.municipios = [];
    this.barrios = [];
    forkJoin([
      this.municipioService.findAll(),
      this.barrioService.findAll()
    ]).subscribe(([municipios, barrios]) => {
      this.municipios = municipios;
      this.barrios = barrios;
    }, error => {
      this.barrioForm.reset();
      Alerts.error('Error', 'No se pudo cargar la municipo', error);
    });
  }
  private get barrio(): Barrio {
    let barrio: Barrio = new Barrio();
    barrio.idMunicipio = this.barrioForm.get('idMunicipio').value;
    barrio.idBarrio = this.barrioForm.get('idBarrio').value;
    barrio.barrio = this.barrioForm.get('barrio').value;
    barrio.fechaCreacion = new Date();
    barrio.fechaModificacion = Utils.isNullOrUndefined(this.barrioForm.get('fechaModificacion').value)
      ? new Date()
      : this.barrioForm.get('fechaModificacion').value;
    barrio.modificado = 'admin';
    return barrio;
  }
}
