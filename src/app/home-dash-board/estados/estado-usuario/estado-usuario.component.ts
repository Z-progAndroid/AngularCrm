import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';

@Component({
  selector: 'app-estado-usuario',
  templateUrl: './estado-usuario.component.html',
  styleUrls: ['./estado-usuario.component.scss']
})
export class EstadoUsuarioComponent implements OnInit {
  estadoUsuarioForm: FormGroup
  estadosUsuario: EstadoUsuario[]
  constructor(
    private fb: FormBuilder,
    private estadoUsuarioService: EstadoUsuarioService
  ) { }
  ngOnInit(): void {
    this.estadoUsuarioForm = this.fb.group({
      idEstadoUsuario: ['', Validators.required],
      estadoUsuario: ['', Validators.required]
    });
    this.estadoUsuarioService.findAll().subscribe(estadosUsuario => this.estadosUsuario = estadosUsuario)
      , error => console.log(error);
  }
  submit() {
    let estadoUsuario: EstadoUsuario = Object.assign({}, this.estadoUsuarioForm.value);
    estadoUsuario.fechaCreacion = new Date();
    estadoUsuario.fechaModificacion = new Date();
    estadoUsuario.modificado = 'admin';
    this.estadoUsuarioService.save(estadoUsuario).subscribe(
      (estadoUsuario: EstadoUsuario) => {
        this.estadoUsuarioService.findAll().subscribe(
          estadosUsuario => this.estadosUsuario = estadosUsuario
        ), error => console.log(error);
      }, error => console.log(error));

  }
  editar(id: number) {
    this.estadoUsuarioService.findById(id).subscribe(
      (estadoUsuario: EstadoUsuario) => {
        this.estadoUsuarioForm.patchValue(estadoUsuario);
        this.estadoUsuarioForm.enable();
      }), error => console.log(error);

  }
  eliminar(id: number) {
    this.estadoUsuarioService.delete(id).subscribe(
      (mensaje: any) => {
        this.estadoUsuarioService.findAll().subscribe(
          estadosUsuario => this.estadosUsuario = estadosUsuario
        ), error => console.log(error);
      }), error => console.log(error);
  }
  ver(id: number) {
    this.estadoUsuarioService.findById(id).subscribe(
      (estadoUsuario: EstadoUsuario) => {
        this.estadoUsuarioForm.patchValue(estadoUsuario);
        this.estadoUsuarioForm.disable();
      }
    ), error => console.log(error);
  }
  deshabilitar(id: number): boolean {
    return id === 0;
  }  
}
