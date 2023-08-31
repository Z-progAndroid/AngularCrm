import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../models/LoginRequest";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../models/RegisterRequest";
import { map } from "rxjs";
import { Router } from "@angular/router";
import { ForgotPasswordRequest } from "../models/ForgotPassword";

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USERNAME_KEY = 'username';
const LOCAL_STORAGE_ROL_KEY = 'rol';
const LOCAL_STORAGE_ESTADO_USUARIO_KEY = 'estadoUsuario';
const LOCAL_STORAGE_ID_USUARIO_KEY = 'idUsuario';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    login(credenciales: LoginRequest) {
        return this.http.post<any>(`${environment.urlBase}auth/login`, credenciales, { observe: 'response' })
            .pipe(map(user => {
                if (user && user.body) {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, user.body.token);
                    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.body.username);
                    localStorage.setItem(LOCAL_STORAGE_ROL_KEY, user.body.rol);
                    localStorage.setItem(LOCAL_STORAGE_ESTADO_USUARIO_KEY, user.body.estadoUsuario);
                    localStorage.setItem(LOCAL_STORAGE_ID_USUARIO_KEY, user.body.idUsuario);
                }
                return user;
            }
            ));
    }
    register(registro: RegisterRequest) {
        return this.http.post<any>(`${environment.urlBase}auth/register`, registro);
    }
    cambiarPassword(password: ForgotPasswordRequest) {
        return this.http.post<any>(`${environment.urlBase}auth/forgotPassword`, password);
    }

    getToken() {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    }
    getUsername() {
        return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    }
    getRol() {
        return localStorage.getItem(LOCAL_STORAGE_ROL_KEY);
    }
    getEstadoUsuario() {
        return localStorage.getItem(LOCAL_STORAGE_ESTADO_USUARIO_KEY);
    }
    getIdUsuario() {
        return Number(localStorage.getItem(LOCAL_STORAGE_ID_USUARIO_KEY));
    }
    isUser(): boolean {
        return this.getRol() === 'USUARIO' || this.getRol().includes('USUARIO');
    }
    isAgent(): boolean {
        return this.getRol() === 'AGENTE' || this.getRol().includes('AGENTE');
    }
    isAdmin(): boolean {
        return this.getRol() === 'ADMIN' || this.getRol().includes('ADMIN');
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}