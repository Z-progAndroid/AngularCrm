import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { TipoInmuebleService } from 'src/app/services/tipo-inmueble.service';

@Component({
  selector: 'app-tipo-inmuebles',
  templateUrl: './tipo-inmuebles.component.html',
  styleUrls: ['./tipo-inmuebles.component.scss']
})
export class TipoInmueblesComponent {
  tipoInmueblesForm: FormGroup
  tipoInmueble: TipoInmueble []
  constructor(
    private fb: FormBuilder,
    private tipoInmuebleService: TipoInmuebleService
  ) { }
  ngOnInit(): void {
    this.tipoInmueblesForm = this.fb.group({
      id: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.tipoInmuebleService.findAll().subscribe(tipoInmueble => this.tipoInmueble = tipoInmueble)
      , error => console.log(error);
  }
  submit() {
    let tipoInmueble: TipoInmueble=new TipoInmueble();
    tipoInmueble.id = this.tipoInmueblesForm.get('id').value;
    tipoInmueble.tipo = this.tipoInmueblesForm.get('tipo').value;
    tipoInmueble.fechaCreacion = new Date();
    tipoInmueble.fechaModificacion = new Date();
    tipoInmueble.modificado = 'admin';
    this.tipoInmuebleService.save(tipoInmueble).subscribe((tipoInmueble: TipoInmueble) => {
        this.tipoInmuebleService.findAll().subscribe(
          tipoInmueble => this.tipoInmueble = tipoInmueble
        ), error => console.log(error);
      }, error => console.log(error));

  }
  editar(id: number) {
    this.tipoInmuebleService.findById(id).subscribe(
      (tipoInmueble: TipoInmueble) => {
        this.tipoInmueblesForm.patchValue(tipoInmueble);
        this.tipoInmueblesForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.tipoInmuebleService.delete(id).subscribe(
      (mensaje: any) => {
        this.tipoInmuebleService.findAll().subscribe(
          tipoInmueble => this.tipoInmueble = tipoInmueble
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.tipoInmuebleService.findById(id).subscribe(
      (tipoInmueble: TipoInmueble) => {
        this.tipoInmueblesForm.patchValue(tipoInmueble);
        this.tipoInmueblesForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }
}
