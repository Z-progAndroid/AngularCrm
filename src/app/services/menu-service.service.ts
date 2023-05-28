import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor() { }

  getMenu() {
    return [
      {
        title: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        link: '/dashboard'
      },
      {
        title: 'User',
        icon: 'fas fa-user-alt',
        link: '/user'
      },
      {
        title: 'Inmueble',
        icon: 'fas fa-building',
        link: '/inmueble'
      },
      {
        title: 'Cita',
        icon: 'fas fa-calendar-day',
        link: '/cita'
      },
      {
        title: 'Contrato',
        icon: 'fas fa-file-contract',
        link: '/contrato'
      },
      {
        title: 'Seguimiento',
        icon: 'fas fa-chart-pie',
        link: '/seguimiento'
      },
      {
        title: 'Tarea',
        icon: 'fas fa-tasks',
        link: '/tarea'
      },
      {
        title: 'Estados',
        icon: 'fas fa-flag',
        link: '/estados'
      },
      {
        title: 'Tipos',
        icon: 'fas fa-star',
        link: '/tipos'
      },
      {
        title: 'Desconectar',
        icon: 'fas fa-sign-out-alt',
        link: '/'
      }
    ];
  }
}
