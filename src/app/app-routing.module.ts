import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashBoardComponent } from './home-dash-board/home-dash-board.component';
import { UserComponent } from './home-dash-board/user/user.component';
import { DashboardComponent } from './home-dash-board/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { InmuebleComponent } from './home-dash-board/inmueble/inmueble.component';
import { CitaComponent } from './home-dash-board/cita/cita.component';
import { ContratoComponent } from './home-dash-board/contrato/contrato.component';
import { SeguimientoComponent } from './home-dash-board/seguimiento/seguimiento.component';
import { TareaComponent } from './home-dash-board/tarea/tarea.component';
import { UserDetailsComponent } from './home-dash-board/user/user-details/user-details.component';
import { InmuebleDetailComponent } from './home-dash-board/inmueble/inmueble-detail/inmueble-detail.component';
import { EstadosComponent } from './home-dash-board/estados/estados.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/editar/:id', component: UserDetailsComponent },
  { path: 'user/ver/:id', component: UserDetailsComponent },
  { path: 'user/crear', component: UserDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inmueble', component: InmuebleComponent },
  { path: 'inmueble/editar/:id', component: InmuebleDetailComponent },
  { path: 'inmueble/ver/:id', component: InmuebleDetailComponent },
  { path: 'inmueble/crear', component: InmuebleDetailComponent },
  { path: 'estados', component: EstadosComponent },
  { path: 'cita', component: CitaComponent },
  { path: 'contrato', component: ContratoComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'tarea', component: TareaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }