import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Barrio } from 'src/app/models/barrio';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { BarrioService } from 'src/app/services/barrio.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

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
    this.barrioForm = this.fb.group({
      idMunicipio: ['', Validators.required],
      idBarrio: ['', Validators.required],
      barrio: ['', Validators.required]
    })

    forkJoin([
      this.municipioService.findAll(),
      this.barrioService.findAll()
    ]).subscribe(([municipios,barrios]) => {
      this.municipios = municipios;
      this.barrios = barrios;
    }), error => console.log(error);
  }
  submit() {
    let pais: Barrio = new Barrio();
    pais = Object.assign({}, this.barrioForm.value);
    pais.fechaCreacion = new Date();
    pais.fechaModificacion = new Date();
    pais.modificado = 'admin';
    this.barrioService.save(pais).subscribe(data => {
      this.barrioForm.reset();
      this.ngOnInit();
    }), error => console.log(error);

  }
  ver(id: number) {
    this.barrioService.findById(id).subscribe(
      (barrio: Barrio) => {
        console.log(barrio);
        this.barrioForm.patchValue(barrio);
        this.barrioForm.disable();
      }), error => console.log(error);
  }
  editar(id: number) {
    console.log(id);
    this.barrioService.findById(id).subscribe(
      (barrio: Barrio) => {
        console.log(barrio);
        this.barrioForm.get('idMunicipio').setValue(barrio.idMunicipio);
        this.barrioForm.get('idBarrio').setValue(barrio.idBarrio);
        this.barrioForm.get('barrio').setValue(barrio.barrio);
        this.barrioForm.enable();
      }), error => console.log(error);
  }
  eliminar(id: number) {
    this.barrioService.delete(id).subscribe(
      (mensaje: any) => {
        console.log(mensaje);
        this.ngOnInit();
      }), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
