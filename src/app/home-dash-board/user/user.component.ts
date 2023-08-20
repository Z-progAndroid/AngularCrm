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
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { TableColumn } from 'src/app/interfaces/table-column';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {
  usuarios: User[] = [];
  roles: Rol[] = [];
  estados: EstadoUsuario[] = [];
  userSearchForm: FormGroup;
  tableColumns: TableColumn[] = [
    { name: 'Nombre', dataKey: 'nombre' },
    { name: 'Apellidos', dataKey: 'apellido' },
    { name: 'Email', dataKey: 'email' },
    { name: 'Rol', dataKey: 'rol' },
    { name: 'Estado', dataKey: 'estadoUsuario' }
  ];
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private rolService: RolService,
    private estadoUsuarioService: EstadoUsuarioService,
    private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.userSearchForm = this.iniciarFormulario();
    this.cargarUsuarios();
  }
  onSubmit() {
    this.usuarios = [];
    this.usuarioService.findByParams(this.fromToUserSearch()).subscribe(usuarios => {
      this.usuarios = usuarios;
    }, error => Alerts.error("Error", "Error al buscar los usuarios por los paramentros de busqueda", error));
  }
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      telefono: [''],
      dni: [''],
      direccion: [''],
      rol: [0],
      estado: [0]
    });
  }
  limpiarFiltros() {
    this.userSearchForm = this.iniciarFormulario();
    this.cargarUsuarios();
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
  cargarUsuarios() {
    this.usuarios = [];
    forkJoin([
      this.rolService.findAll(),
      this.estadoUsuarioService.findAll(),
      this.usuarioService.findAll()
    ]).subscribe(
      ([roles, estados, usuarios]: [Rol[], EstadoUsuario[], User[]]) => {
        this.roles = roles;
        this.estados = estados;
        this.usuarios = usuarios;
      }, error => {
        Alerts.error("Error", "Error al cargar los usuarios", error);
      });
  }
  edit($event) {
    console.log($event);
    this.router.navigate(['/home-dashboard/user/editar', $event.idUsuario]);
  }
  export($event) {
    console.log($event);
    this.usuarioService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe(data => {
      Utils.descargarFichero(data, "usuarios.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }, error => {
      Alerts.error("Error", "Error al exportar los usuarios", error);
    });
  }
  delete($event) {
    console.log($event);
    Alerts.warning("Eliminar", "¿Está seguro que desea eliminar el usuario? ,se eliminara permanentemente", 'Si, eliminar').then(result => {
      if (!result.isConfirmed) {
        Alerts.info("Información", "Operación cancelada por el usuario");
        return;
      }
      this.usuarioService.delete($event.idUsuario).subscribe(result => {
        Alerts.success("Éxito", "Usuario eliminado correctamente");
        this.cargarUsuarios();
      }, error => {
        Alerts.error("Error", "Error al eliminar el usuario", error);
      });
    });

  }
}
