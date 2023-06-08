import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/services/usuario.service';
import { forkJoin } from 'rxjs';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { Rol } from 'src/app/models/rol';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from 'src/app/utils/Utils';
import { error } from 'console';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usuarios: User[] = [];
  roles: Rol[] = [];
  estados: EstadoUsuario[] = [];
  userSearchForm: FormGroup;
  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private rolService: RolService, private estadoUsuarioService: EstadoUsuarioService) { }
  ngOnInit(): void {
    this.userSearchForm = this.iniciarFormulario();
    forkJoin([
      this.rolService.findAll(),
      this.estadoUsuarioService.findAll(),
      this.usuarioService.findAll()
    ]).subscribe(
      ([roles, estados, usuarios]: [Rol[], EstadoUsuario[], User[]]) => {
        this.roles = roles;
        this.estados = estados;
        this.usuarios = usuarios;
      },
      error => console.log(error)
    );
  }
  onSubmit() {
    this.usuarioService.findByParams(this.fromToUserSearch()).subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    ),error => console.log(error);

  }
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      telefono: [''],
      dni: [''],
      direccion: [''],
      rol: [''],
      estado: ['']
    });
  }
  fromToUserSearch(): User {
    let userSearch: User = new User();
    userSearch.nombre = Utils.isNullOrUndefined(this.userSearchForm.get('nombre').value) ? null : this.userSearchForm.get('nombre').value;
    userSearch.apellido = Utils.isNullOrUndefined(this.userSearchForm.get('apellido').value) ? null : this.userSearchForm.get('apellido').value;
    userSearch.email = Utils.isNullOrUndefined(this.userSearchForm.get('email').value) ? null : this.userSearchForm.get('email').value;
    userSearch.telefono = Utils.isNullOrUndefined(this.userSearchForm.get('telefono').value) ? null : this.userSearchForm.get('telefono').value;
    userSearch.dni = Utils.isNullOrUndefined(this.userSearchForm.get('dni').value) ? null : this.userSearchForm.get('dni').value;
    userSearch.direccion = Utils.isNullOrUndefined(this.userSearchForm.get('direccion').value) ? null : this.userSearchForm.get('direccion').value;
    userSearch.idRol = Utils.isNullOrUndefined(this.userSearchForm.get('rol').value) ? null : this.userSearchForm.get('rol').value;
    userSearch.idEstadoUsuario = Utils.isNullOrUndefined(this.userSearchForm.get('estado').value) ? null : this.userSearchForm.get('estado').value;
    return userSearch;
  }
}
