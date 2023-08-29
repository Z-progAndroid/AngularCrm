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
        link: '/home-dashboard/dashboard'
      },
      {
        title: 'User',
        icon: 'fas fa-user-alt',
        link: '/home-dashboard/user'
      },
      {
        title: 'Inmueble',
        icon: 'fas fa-building',
        link: '/home-dashboard/inmueble'
      },
      {
        title: 'Cita',
        icon: 'fas fa-calendar-day',
        link: '/home-dashboard/cita'
      },
      {
        title: 'Contrato',
        icon: 'fas fa-file-contract',
        link: '/home-dashboard/contrato'
      },
      {
        title: 'Tarea',
        icon: 'fas fa-tasks',
        link: '/home-dashboard/tarea'
      },
      {
        title: 'Estados',
        icon: 'fas fa-flag',
        link: '/home-dashboard/estados'
      },
      {
        title: 'Tipos',
        icon: 'fas fa-star',
        link: '/home-dashboard/tipos'
      },
      {
        title: 'Ubicaciones',
        icon: 'fas fa-globe',
        link: '/home-dashboard/ubicacion'
      }
    ];
  }
  getMenuAgente() {
    return [
      {
        title: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        link: '/home-dashboard/dashboard'
      },
      {
        title: 'Inmueble',
        icon: 'fas fa-building',
        link: '/home-dashboard/inmueble'
      },
      {
        title: 'Cita',
        icon: 'fas fa-calendar-day',
        link: '/home-dashboard/cita'
      },
      {
        title: 'Contrato',
        icon: 'fas fa-file-contract',
        link: '/home-dashboard/contrato'
      },
      {
        title: 'Tarea',
        icon: 'fas fa-tasks',
        link: '/home-dashboard/tarea'
      }
    
    ];
  }
}