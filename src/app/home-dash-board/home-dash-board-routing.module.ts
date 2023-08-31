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
import { RolGuardGuard } from '../guards/rol-guard.guard';

const routes: Routes = [
  {
    path: '', component: HomeDashBoardComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'user/editar/:id', component: UserDetailsComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'user/ver/:id', component: UserDetailsComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'user/crear', component: UserDetailsComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'inmueble', component: InmuebleComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'inmueble/editar/:id', component: InmuebleDetailComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'inmueble/ver/:id', component: InmuebleDetailComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'inmueble/crear', component: InmuebleDetailComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'estados', component: EstadosComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'tipos', component: TiposComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'ubicacion', component: UbicacionesComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'cita', component: CitaComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'cita/crear', component: CitaCrearComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'cita/editar/:id', component: CitaCrearComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'contrato', component: ContratoComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'contrato/crear', component: ContratoEditarComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'contrato/editar/:id', component: ContratoEditarComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'tarea', component: TareaComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'tarea/crear', component: TareaEditarComponent, canActivate: [AuthGuard,RolGuardGuard] },
      { path: 'tarea/editar/:id', component: TareaEditarComponent, canActivate: [AuthGuard,RolGuardGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDashBoardRoutingModule { }
