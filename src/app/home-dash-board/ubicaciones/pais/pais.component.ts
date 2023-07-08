import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais';

import { PaisService } from 'src/app/services/pais.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent {
  paisForm: FormGroup
  paises: Pais[]
  idPaisExistente: string='';
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarPaises();
  }
  submit() {
    Alerts.warning('Avertencia', '¿Está seguro de guardar el país?', 'Si, guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por usuario');
          return
        }
        this.paisService.save(this.pais).subscribe(data => {
          Alerts.success('Exito', 'País guardado con éxito');
          this.idPaisExistente='';
          this.paisForm.reset();
          this.cargarPaises();
        }, error => Alerts.error('Error', 'Error guardando el país', error));
      })

  }
  ver(id: string) {
    this.paisService.findById(id).subscribe(
      (pais: Pais) => {
        this.paisForm.patchValue(pais);
        this.paisForm.disable();
      }, error => Alerts.error('Error', 'Error cargando el país', error));
  }
  editar(id: string) {
    this.paisService.findById(id).subscribe(
      (pais: Pais) => {
        this.idPaisExistente =id;
        this.paisForm.patchValue(pais);
        this.paisForm.enable();
      }, error => Alerts.error('Error', 'Error cargando el país', error));
  }
  eliminar(id: string) {
    Alerts.warning('Avertencia', '¿ Está seguro de borrar el país ,tenga en cuenta que se borran los registros relacionados ?', 'Si, guardar')
      .then((result) => {
        if (!result.isConfirmed) {
          Alerts.info('Información', 'Operación cancelada por usuario');
          return
        }
        this.paisService.delete(id).subscribe(() => {
          Alerts.success('Exito', 'País eliminado con éxito');
          this.idPaisExistente='';
          this.paisForm.reset();
          this.cargarPaises();
        }, error => Alerts.error('Error', 'Error eliminando el país', error));
      })
  }
  cargarPaises() {
    this.paises = [];
    this.paisService.findAll().subscribe(data => {
      this.paises = data
    }, error => Alerts.error('Error', 'Error cargando los países', error));
  }
  crearFormulario() {
    this.paisForm = this.fb.group({
      idPais: ['', Validators.required],
      pais: ['', Validators.required],
      fechaModificacion: ['']   
    });
  }
  private get pais() {
    let pais: Pais = new Pais();
    pais.idPaisExistente = this.idPaisExistente;
    pais.idPais = this.paisForm.get('idPais').value;
    pais.pais = this.paisForm.get('pais').value;
    pais.fechaCreacion = new Date();
    pais.fechaModificacion = Utils.isNullOrUndefined(this.paisForm.get('fechaModificacion').value)
      ? new Date()
      : this.paisForm.get('fechaModificacion').value;
    pais.modificado = 'admin';
    return pais;
  }
}
