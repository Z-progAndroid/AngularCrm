import { Component, OnInit, HostListener } from '@angular/core';
import { InmuebleService } from '../services/inmueble.service';
import { Inmueble } from '../models/inmueble';
import { Alerts } from '../utils/Alerts';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/LoginRequest';
const MOVIL_SIZE = 802;
@Component({
  selector: 'app-stay-list',
  templateUrl: './stay-list.component.html',
  styleUrls: ['./stay-list.component.scss']
})
export class StayListComponent implements OnInit {
  inmuebles: Inmueble[] = [];
  constructor(
    private inmuebleService: InmuebleService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.cargarInmuebles();
  }
  cargarInmuebles() {
    this.inmuebleService.findAllSinRelaciones().subscribe((response: Inmueble[]) => {
      this.inmuebles = response.map(inmueble => {
        inmueble.imagenes = [];
        if (inmueble.imagen1) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen1));
        if (inmueble.imagen2) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen2));
        if (inmueble.imagen3) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen3));
        if (inmueble.imagen4) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen4));
        return inmueble;
      });
    }, err => Alerts.error("Error", "Error al cargar los inmuebles", err));
  }
  buscaqueda($event) {
    this.inmuebles = [];
    this.inmuebleService.searchSinRelaciones($event).subscribe((response: Inmueble[]) => {
      this.inmuebles = response .map(inmueble => {
          inmueble.imagenes = [];
          if (inmueble.imagen1) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen1));
          if (inmueble.imagen2) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen2));
          if (inmueble.imagen3) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen3));
          if (inmueble.imagen4) inmueble.imagenes.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + inmueble.imagen4));
          return inmueble;
        });
    }, err => Alerts.error("Error", "Error al cargar los inmuebles", err));
  }
}