import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/models/inmueble';
import { AuthService } from 'src/app/services/auth.service';
const MOVIL_SIZE = 802;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() visible: boolean = true;
  @Input() botonVisible: boolean = true;
  logeado: boolean = false;
  isMobileResize: boolean = false;
  isElementVisible: boolean = true;
  @Output() buscardor: EventEmitter<Inmueble> = new EventEmitter();
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.getToken()) {
      this.logeado = true;
      this.botonVisible = false;
    } else {
      this.logeado = false;
      this.botonVisible = true;
    }
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any): void {
    this.isMobileResize = window?.innerWidth < MOVIL_SIZE
      ? true
      : false;
    if (this.isMobileResize) {
      this.isElementVisible = false;
    } else {
      this.isElementVisible = true;
    }
  }
  toggleElement(): void {
    this.isElementVisible = !this.isElementVisible;
  }
  buscar($event): void {
    this.buscardor.emit($event);
  }
  logout() {
    this.authService.logout();
  }
  imagenClicada() {
    this.router.navigate(['/listado']);
  }
}
