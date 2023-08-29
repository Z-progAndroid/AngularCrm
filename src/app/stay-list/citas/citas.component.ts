import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Cita } from 'src/app/models/cita';
import { AuthService } from 'src/app/services/auth.service';
import { CitasService } from 'src/app/services/citas.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  citas: Cita[]
  constructor(
    private citasService: CitasService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.citasService.citasUsuarioNoEliminadas(this.authService.getIdUsuario()).subscribe(citas => {
      this.citas = citas;
    }, error => Alerts.error('Error', 'Error al cargar las citas del usuaraio', error))
  }
  descargarDetalle(idCita: number) {
    this.citasService.generarCitaPdf(idCita).subscribe((data) => {
      Utils.descargarFichero(data, 'cita.pdf', 'application/pdf');
    }, error => Alerts.error('Error', 'Error al obtener el pddf de la cita', error));
  }
}
