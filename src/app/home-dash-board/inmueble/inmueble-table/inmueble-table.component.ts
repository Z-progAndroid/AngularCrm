import { Component, Input } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Mensaje } from 'src/app/models/mensaje';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inmueble-table',
  templateUrl: './inmueble-table.component.html',
  styleUrls: ['./inmueble-table.component.scss']
})
export class InmuebleTableComponent {
  @Input() inmuebles: Inmueble[];
  constructor(
    private inmuebleService: InmuebleService,
    private location: Location
  ) { }
  onDelete(id: number) {
    this.inmuebleService.delete(id).subscribe((mensaje: Mensaje) => {
      this.location.go(this.location.path());
      window.location.reload();
    });
  }
}
