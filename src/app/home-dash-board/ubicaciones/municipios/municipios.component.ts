import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Municipo } from 'src/app/models/municipo';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

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
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService
  ) { }
  ngOnInit(): void {
    this.municipiosForm = this.fb.group({
      idProvincia: ['', Validators.required],
      idMunicipio: ['', Validators.required],
      municipio: ['', Validators.required]
    })

    forkJoin([
      this.provinciaService.findAll(),
      this.municipioService.findAll()
    ]).subscribe(([provincias, municipios]) => {
      this.provincias = provincias;
      this.municipios = municipios;
    }), error => console.log(error);
  }
  submit() {
    let pais: Municipo = new Municipo();
    pais = Object.assign({}, this.municipiosForm.value);
    pais.fechaCreacion = new Date();
    pais.fechaModificacion = new Date();
    pais.modificado = 'admin';
    this.municipioService.save(pais).subscribe(data => {
      this.municipiosForm.reset();
      this.ngOnInit();
    }), error => console.log(error);

  }
  ver(id: number) {
    this.municipioService.findById(id).subscribe(
      (provincia: Municipo) => {
        console.log(provincia);
        this.municipiosForm.patchValue(provincia);
        this.municipiosForm.disable();
      }), error => console.log(error);
  }
  editar(id: number) {
    console.log(id);
    this.municipioService.findById(id).subscribe(
      (provincia: Municipo) => {
        console.log(provincia);
        this.municipiosForm.get('idProvincia').setValue(provincia.idProvincia);
        this.municipiosForm.get('municipio').setValue(provincia.municipio);
        this.municipiosForm.get('idMunicipio').setValue(provincia.idMunicipio);
        this.municipiosForm.enable();
      }), error => console.log(error);
  }
  eliminar(id: number) {
    this.municipioService.delete(id).subscribe(
      (mensaje: any) => {
        console.log(mensaje);
        this.ngOnInit();
      }), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
