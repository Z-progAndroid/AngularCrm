import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Router } from '@angular/router';
import esLocale from '@fullcalendar/core/locales/es';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/models/cita';
import { Alerts } from 'src/app/utils/Alerts';
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent extends BaseComponent implements OnInit {
  legend = [
    { nombre: 'VISTA PROPIEDAD', color: 'background-color:#66b2b2;' },
    { nombre: 'EVALUACIÓN DE PROPIEDAD', color: 'background-color:#6699cc;' },
    { nombre: 'FIRMA DE CONTRATOS', color: 'background-color:#6699ff;' },
    { nombre: 'NEGOCIACIÓN', color: 'background-color:#b3d9ff;' },
    { nombre: 'ASESORAMIENTO', color: 'background-color:#99ccff;' },
    { nombre: 'PENDIENTE', color: 'background-color:#99CC00;' },
    
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private citaService: CitasService,
  ) { super(); }
  ngOnInit(): void {
    this.cargarCitas();
  }

  calendarGridOptions: CalendarOptions = {
    headerToolbar: {
      left: 'title',
      center: '',  
      right: 'today,prev,next'
    },
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: false,
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    locale: esLocale,
    events: []
  };

  calendarListOptions: CalendarOptions = {
    plugins: [listPlugin, interactionPlugin],
    locale: esLocale,
    weekends: false,
    initialView: 'listDay',
    headerToolbar: { left: '', center: 'title', right: 'today,prev,next' },
    titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    events: []
  };
  handleDateClick(arg) {
    this.router.navigate(['/home-dashboard/cita/crear']);
  }
  handleEventClick(arg) {
    this.router.navigate(['/home-dashboard/cita/editar/' + arg.event.id]);
  }
  cargarCitas() {
    this.citaService.findAllPendienteYActivas().subscribe((citas: Cita[]) => {
      const citasFormateadas = citas.map((cita) => ({
        id: cita.idCita.toString(),
        allDay: false,
        title: cita.titulo,
        startEditable: true,
        start: new Date(cita.fechaIncio[0], cita.fechaIncio[1] - 1, cita.fechaIncio[2], cita.fechaIncio[3], cita.fechaIncio[4], cita.fechaIncio[5]).toISOString(),
        end: new Date(cita.fechaFin[0], cita.fechaFin[1] - 1, cita.fechaFin[2], cita.fechaFin[3], cita.fechaFin[4], cita.fechaFin[5]).toISOString(),
        backgroundColor: this.getTipoCitaColor(cita.idTipoCita,cita.idEstadoCita==1),
        borderColor: this.getTipoCitaColor(cita.idTipoCita,cita.idEstadoCita==1),
      }));
      this.calendarGridOptions.events = citasFormateadas;
      this.calendarListOptions.events = citasFormateadas;
    }, error => Alerts.error('Error', 'Error al cargar las citas', error));    
  }
  
  getTipoCitaColor(tipoCita: number, pendiente: boolean): string {
    if (pendiente) {
      return '#99CC00';
    }
    const tiposCitaColores = {
      1: '#66b2b2',
      2: '#6699cc',
      3: '#6699ff',
      4: '#b3d9ff',
      5: '#99ccff',
    };
    return tiposCitaColores[tipoCita] || 'gray';
  }
}