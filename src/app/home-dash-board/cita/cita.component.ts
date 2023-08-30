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
import { TipoCitaService } from 'src/app/services/tipo-cita.service';
import { TipoCita } from 'src/app/models/tipo-cita';
import { EstadoCitasService } from 'src/app/services/estado-citas.service';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { TableColumn } from 'src/app/interfaces/table-column';
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent extends BaseComponent implements OnInit {
  legend = [];
  legendEstado = [];
  tipoCitas: TipoCita[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private citaService: CitasService,
    private tipoCitaService: TipoCitaService,
    private estadoCitaService: EstadoCitasService,
  ) { super(); }
  ngOnInit(): void {
    this.cargarCitas();
    this.crearLeyenda();
    this.crearLeyendaEstados();
  }
  crearLeyenda() {
    this.tipoCitaService.findAll().subscribe((tipoCitas: TipoCita[]) => {
      tipoCitas.forEach(element => {
        if (element.tipoCita === 'VISTA PROPIEDAD') {
          this.legend.push({ nombre: 'VISTA PROPIEDAD', color: 'background-color:#66b2b2;' });
          return;
        }
        if (element.tipoCita === 'EVALUACIÓN DE PROPIEDAD') {
          this.legend.push({ nombre: 'EVALUACIÓN DE PROPIEDAD', color: 'background-color:#6699cc;' });
          return;
        }
        if (element.tipoCita === 'FIRMA DE CONTRATOS') {
          this.legend.push({ nombre: 'FIRMA DE CONTRATOS', color: 'background-color:#6699ff;' });
          return;
        }
        if (element.tipoCita === 'NEGOCIACIÓN') {
          this.legend.push({ nombre: 'NEGOCIACIÓN', color: 'background-color:#b3d9ff;' });
          return;
        }
        if (element.tipoCita === 'ASESORAMIENTO') {
          this.legend.push({ nombre: 'ASESORAMIENTO', color: 'background-color:#99ccff;' });
          return;
        }
        this.legend.push({ nombre: 'SIN CLASIFICAR', color: 'background-color:#E3E3E3;' });
      });
    }, error => {
      Alerts.error('Error', 'Error al cargar los tipos de citas', error);
    });
  }
  crearLeyendaEstados() {
    /*   'POR DEFECTO #CCCCCC';
   'PENDIENTE #FFFF00';
   'CONFIRMADA #00FF00';
   'CANCELADA #FF0000';
   'REALIZADA #0000FF';
   'REAGENDADA #FFA500';
   'ELIMINADO #333333';
   'ACTIVA #00FF99';
     */
    this.estadoCitaService.findAll().subscribe((estadoCitas: EstadoCitas[]) => {
      estadoCitas.forEach(element => {
        if (element.estadoCita === 'POR DEFECTO') {
          this.legendEstado.push({ nombre: 'POR DEFECTO', color: 'background-color:##CCCCCC;' });
          return;
        }
        if (element.estadoCita === 'PENDIENTE') {
          this.legendEstado.push({ nombre: 'PENDIENTE', color: 'background-color:#FFFF00;' });
          return;
        }
        if (element.estadoCita === 'CONFIRMADA') {
          this.legendEstado.push({ nombre: 'CONFIRMADA', color: 'background-color:#00CC00;' });
          return;
        }
        if (element.estadoCita === 'CANCELADA') {
          this.legendEstado.push({ nombre: 'CANCELADA', color: 'background-color:#FF0000;' });
          return;
        }
        if (element.estadoCita === 'REALIZADA') {
          this.legendEstado.push({ nombre: 'REALIZADA', color: 'background-color:#0000FF;' });
          return;
        }
        if (element.estadoCita === 'REAGENDADA') {
          this.legendEstado.push({ nombre: 'REAGENDADA', color: 'background-color:#FFA500;' });
          return;
        }
        if (element.estadoCita === 'ELIMINADO') {
          this.legendEstado.push({ nombre: 'ELIMINADO', color: 'background-color:#333333;' });
          return;
        }
        if (element.estadoCita === 'ACTIVA') {
          this.legendEstado.push({ nombre: 'ACTIVA', color: 'background-color:#33FF33;' });
          return;
        }
      });
    }, error => {
      Alerts.error('Error', 'Error al cargar los tipos de citas', error);
    });
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
    this.citaService.findAll().subscribe((citas: Cita[]) => {
      const citasFormateadas = citas.map((cita) => ({
        id: cita.idCita.toString(),
        allDay: false,
        title: cita.titulo,
        start: new Date(cita.fechaIncio[0], cita.fechaIncio[1] - 1, cita.fechaIncio[2], cita.fechaIncio[3], cita.fechaIncio[4], cita.fechaIncio[5]).toISOString(),
        end: new Date(cita.fechaFin[0], cita.fechaFin[1] - 1, cita.fechaFin[2], cita.fechaFin[3], cita.fechaFin[4], cita.fechaFin[5]).toISOString(),
        backgroundColor: this.getTipoCitaColor(cita.idTipoCita),
        borderColor: this.getEstadoCitaColor(cita.idEstadoCita),
      }));
      this.calendarGridOptions.events = citasFormateadas;
      this.calendarListOptions.events = citasFormateadas;
    }, error => Alerts.error('Error', 'Error al cargar las citas', error));
  }

  getTipoCitaColor(tipoCita: number): string {
    const tiposCitaColores = {1: '#66b2b2',2: '#6699cc',3: '#6699ff',4: '#b3d9ff',5: '#99ccff',};
    return tiposCitaColores[tipoCita] || 'gray';
  }
  getEstadoCitaColor(tipoCita: number): string {
    const estadosCitasColores = { 1: '#FFFF00', 2: '#00FF00', 3: '#00CC00', 4: '#0000FF', 5: '#FFA500', 6: '#333333', 7: '#33FF33' };
    return estadosCitasColores[tipoCita] || 'gray';
  }
}
