import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from 'src/app/models/ForgotPassword';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { AuthService } from 'src/app/services/auth.service';
import { Alerts } from 'src/app/utils/Alerts';
import { CustomValidators } from 'src/app/utils/CustomValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mostrarPasswordLogin: boolean = false;
  mostrarPasswordLogin2: boolean = false;
  mostrarPassword: boolean = false;
  mostrarPasswordRepetir: boolean = false;
  cambiarContrasena: FormGroup;
  inicioForm: FormGroup;
  registroForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.crearFormularioIncio();
    this.crearFormularioCambiarContrasena();
    this.crearFormularioRegistro();
  }

  crearFormularioIncio() {
    this.inicioForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }
  crearFormularioRegistro() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required , Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      direccion: [''],
      contrasena: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      contrasenaRepetir: ['', Validators.required]
    }, {
      validator: CustomValidators.passwordsMatchValidator()
    });
  }
  crearFormularioCambiarContrasena() {
    this.cambiarContrasena = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      contrasenaRepetir: ['', Validators.required]
    }, {
      validator: CustomValidators.passwordsMatchValidator()
    });
  }
  inicioSubmit() {
    let login = new LoginRequest();
    login.username = this.inicioForm.value.usuario;
    login.password = this.inicioForm.value.contrasena;
    this.authService.login(login).subscribe((data) => {
      if (this.authService.isUser()) {
        this.router.navigate(['/listado']);
        return;
      }
      this.router.navigate(['/home-dashboard/dashboard']);
    }, error => Alerts.error('Error', 'Usuario o contraseña incorrectos', error));

  }
  cambioContrasenaSubmit() {
    let cambiarContrasena = new ForgotPasswordRequest();
    cambiarContrasena.username = this.cambiarContrasena.value.usuario;
    cambiarContrasena.password = this.cambiarContrasena.value.contrasena;
    this.authService.cambiarPassword(cambiarContrasena).subscribe((data) => {
      Alerts.success('Exito', 'Contraseña cambiada correctamente');
      this.cambiarContrasena.reset();
      this.activarLogin();
    }, error => Alerts.error('Error', 'Usuario o contraseña incorrectos', error));
  }
  registroSubmit() {
    let register = new RegisterRequest();
    register.nombre = this.registroForm.value.nombre;
    register.apellido = this.registroForm.value.apellidos;
    register.email = this.registroForm.value.email;
    register.username = this.registroForm.value.username;
    register.password = this.registroForm.value.contrasena;
    register.telefono = this.registroForm.value.telefono;
    register.direccion = this.registroForm.value.direccion;

    this.authService.register(register).subscribe((data) => {
      Alerts.success('Exito', 'Registro realizado correctamente');
      this.registroForm.reset();
      this.activarLogin();
    });
  }
  activarLogin() {
    this.desactivarTabRegister();
    this.desactivarTabForgotPassword();
    this.activarTabLogin();
  }
  activarRegister() {
    this.desactivarTabLogin();
    this.desactivarTabForgotPassword();
    this.activarTabRegister();
  }
  activarforgotPassword() {
    this.desactivarTabLogin();
    this.desactivarTabRegister();
    this.activarTabForgotPassword();
  }
  activarTabLogin() {
    const tabLogin = document.getElementById('tab-login');
    const pillsLogin = document.getElementById('pills-login');
    const tabLoginLi = document.getElementById('tab-login-li');
    tabLoginLi.classList.remove('d-none');
    tabLogin.classList.add('active');
    pillsLogin.classList.add('show', 'active');
  }
  desactivarTabLogin() {
    const tabLogin = document.getElementById('tab-login');
    const pillsLogin = document.getElementById('pills-login');
    const tabLoginLi = document.getElementById('tab-login-li');
    tabLoginLi.classList.add('d-none');
    tabLogin.classList.remove('active');
    pillsLogin.classList.remove('show', 'active');
  }
  activarTabRegister() {
    const tabRegister = document.getElementById('tab-register');
    const pillsRegister = document.getElementById('pills-register');
    const tabRegisterLi = document.getElementById('tab-register-li');
    tabRegisterLi.classList.remove('d-none');
    tabRegister.classList.add('active');
    pillsRegister.classList.add('show', 'active');
  }
  desactivarTabRegister() {
    const tabRegister = document.getElementById('tab-register');
    const pillsRegister = document.getElementById('pills-register');
    const tabRegisterLi = document.getElementById('tab-register-li');
    tabRegisterLi.classList.add('d-none');
    tabRegister.classList.remove('active');
    pillsRegister.classList.remove('show', 'active');
  }
  activarTabForgotPassword() {
    const tabForgotPassword = document.getElementById('tab-forgot-password');
    const pillsForgot = document.getElementById('pills-forgot');
    const tabForgotPasswordLi = document.getElementById('tab-forgot-password-li');
    tabForgotPasswordLi.classList.remove('d-none');
    tabForgotPassword.classList.add('active');
    pillsForgot.classList.add('show', 'active');
  }
  desactivarTabForgotPassword() {
    const tabForgotPassword = document.getElementById('tab-forgot-password');
    const pillsForgot = document.getElementById('pills-forgot');
    const tabForgotPasswordLi = document.getElementById('tab-forgot-password-li');
    tabForgotPasswordLi.classList.add('d-none');
    tabForgotPassword.classList.remove('active');
    pillsForgot.classList.remove('show', 'active');
  }

}
