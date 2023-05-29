import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent {
  paisForm: FormGroup
  provincias: Provincia[]
  paises: Pais[]
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private provinciaService: ProvinciaService
  ) { }
  ngOnInit(): void {
    this.paisForm = this.fb.group({
      idPais: ['', Validators.required],
      idProvincia: ['', Validators.required],
      provincia: ['', Validators.required]
    })

    forkJoin([
      this.paisService.findAll(),
      this.provinciaService.findAll()
    ]).subscribe(([paises, provincias]) => {
      this.paises = paises;
      this.provincias = provincias;
    }), error => console.log(error);
  }
  submit() {
    let pais:Provincia = new Provincia();
    pais = Object.assign({}, this.paisForm.value);
    pais.fechaCreacion = new Date();
    pais.fechaModificacion = new Date();
    pais.modificado = 'admin';
    this.provinciaService.save(pais).subscribe(data => {
      this.paisForm.reset();
      this.ngOnInit();
    }), error => console.log(error);

  }
  ver(id: number) {
    this.provinciaService.findById(id).subscribe(
      (provincia: Provincia) => {
        console.log(provincia);
        this.paisForm.patchValue(provincia);
        this.paisForm.disable();
      }), error => console.log(error);
  }
  editar(id: number) {
    this.provinciaService.findById(id).subscribe(
      (provincia: Provincia) => {
        console.log(provincia);
        this.paisForm.patchValue(provincia);
        this.paisForm.enable();
      }), error => console.log(error);
  }
  eliminar(id: number) {
    this.provinciaService.delete(id).subscribe(
      (mensaje: any) => {
        console.log(mensaje);
        this.ngOnInit();
      }), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
