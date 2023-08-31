import { Component, OnInit } from '@angular/core';
import { InmuebleService } from '../services/inmueble.service';
import { Inmueble } from '../models/inmueble';
import { Alerts } from '../utils/Alerts';
import { DomSanitizer } from '@angular/platform-browser';

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
  ) { }
  ngOnInit(): void {
    this.cargarInmuebles();
  }
  cargarInmuebles() {
    this.inmuebleService.findAllDisponibles().subscribe((response: Inmueble[]) => {
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