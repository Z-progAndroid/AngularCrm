import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './cita/cita.component';

import { ContratoComponent } from './contrato/contrato.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadosComponent } from './estados/estados.component';
import { InmuebleDetailComponent } from './inmueble/inmueble-detail/inmueble-detail.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { TareaComponent } from './tarea/tarea.component';
import { TiposComponent } from './tipos/tipos.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserComponent } from './user/user.component';
import { HomeDashBoardComponent } from './home-dash-board.component';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { CitaCrearComponent } from './cita/cita-crear/cita-crear.component';
import { TareaEditarComponent } from './tarea/tarea-editar/tarea-editar.component';
import { ContratoEditarComponent } from './contrato/contrato-editar/contrato-editar.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeDashBoardComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'user/editar/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'user/ver/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'user/crear', component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'inmueble', component: InmuebleComponent, canActivate: [AuthGuard] },
      { path: 'inmueble/editar/:id', component: InmuebleDetailComponent, canActivate: [AuthGuard] },
      { path: 'inmueble/ver/:id', component: InmuebleDetailComponent, canActivate: [AuthGuard] },
      { path: 'inmueble/crear', component: InmuebleDetailComponent, canActivate: [AuthGuard] },
      { path: 'estados', component: EstadosComponent, canActivate: [AuthGuard] },
      { path: 'tipos', component: TiposComponent, canActivate: [AuthGuard] },
      { path: 'ubicacion', component: UbicacionesComponent, canActivate: [AuthGuard] },
      { path: 'cita', component: CitaComponent, canActivate: [AuthGuard] },
      { path: 'cita/crear', component: CitaCrearComponent, canActivate: [AuthGuard] },
      { path: 'cita/editar/:id', component: CitaCrearComponent, canActivate: [AuthGuard] },
      { path: 'contrato', component: ContratoComponent, canActivate: [AuthGuard] },
      { path: 'contrato/crear', component: ContratoEditarComponent, canActivate: [AuthGuard] },
      { path: 'contrato/editar/:id', component: ContratoEditarComponent, canActivate: [AuthGuard] },
      { path: 'tarea', component: TareaComponent, canActivate: [AuthGuard] },
      { path: 'tarea/crear', component: TareaEditarComponent, canActivate: [AuthGuard] },
      { path: 'tarea/editar/:id', component: TareaEditarComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDashBoardRoutingModule { }
