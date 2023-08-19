import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { Rol } from 'src/app/models/rol';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Utils } from 'src/app/utils/Utils';
import { Alerts } from 'src/app/utils/Alerts';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CustomValidators } from 'src/app/utils/CustomValidators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  roles: Rol[] = [];
  estados: EstadoUsuario[] = [];
  userForm: FormGroup;
  mostrarPassword: boolean = false;
  botonSave: boolean = false;
  prametosRuta: Params;
  test: String
  constructor(private usuarioService: UsuarioService, private router: Router, private rutaActiva: ActivatedRoute,
    private rolService: RolService, private estadoUsuarioService: EstadoUsuarioService, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.iniciarFormulario();
    this.cargarDatoSelect();
    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    if (!url.includes('crear')) {
      this.cargarDatosUsuario();
    }
  }
  onSubmit() {
    let url = this.rutaActiva.snapshot.url.map((segment: UrlSegment) => segment.path).join('/');
    this.usuarioService.save(this.formToUser()).subscribe((usuario: User) => { 
        Alerts.success('Exito', 'Usuario guardado con exito');
        this.router.navigate(['/home-dashboard/user']);
    }, error => Alerts.error('Error', 'Error al guardar el usuario', error));
  }
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      dni: ['', [Validators.pattern(/^[0-9]{8}[A-Z]$/)]],
      direccion: [''],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      rol: [0, [Validators.required,CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      estado: [0, [Validators.required,CustomValidators.validarSeleccionOpcionPorDefectoValidator()]],
      fechaCreacion: [''],
      fechaModificacion: [''],
      modificado: ['']
    });
  }
  formToUser(): User {
    let user: User = new User();
    user.idUsuario = this.userForm.get('idUsuario').value;
    user.nombre = this.userForm.get('nombre').value;
    user.apellido = this.userForm.get('apellido').value;
    user.email = this.userForm.get('email').value;
    user.telefono = this.userForm.get('telefono').value;
    user.dni = this.userForm.get('dni').value;
    user.direccion = this.userForm.get('direccion').value;
    user.username = this.userForm.get('username').value;
    user.password = this.userForm.get('password').value;
    user.idRol = this.userForm.get('rol').value;
    user.idEstadoUsuario = this.userForm.get('estado').value;
    user.fechaCreacion = Utils.isNullOrUndefined(this.userForm.get('fechaCreacion').value) ? new Date() : this.userForm.get('fechaCreacion').value;
    user.fechaModificacion = new Date();
    user.modificado = "ADMIN";
    return user;
  }
  cargarDatoSelect() {
    forkJoin([
      this.rolService.findAll(),
      this.estadoUsuarioService.findAll(),
    ]).subscribe(([roles, estados]: [Rol[], EstadoUsuario[]]) => {
      this.roles = roles;
      this.estados = estados;
    }, error => Alerts.error('Error', 'Error al cargar los datos', error));
  }
  cargarDatosUsuario() {
    let id = this.rutaActiva.snapshot.params['id'];
    if (Utils.isNullOrUndefined(id)) {
      Alerts.error('Error', 'Error al cargar los datos', 'No se encontro el usuario');
      return;
    }
    this.usuarioService.findById(id).subscribe((usuario: User) => {
      this.userForm.patchValue(usuario);
      this.userForm.get('rol').setValue(usuario.idRol);
      this.userForm.get('estado').setValue(usuario.idEstadoUsuario);
    }, error => Alerts.error('Error', 'Error al cargar los datos del usuario', error));
  }
}

