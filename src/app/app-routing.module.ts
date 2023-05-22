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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inmueble', component: InmuebleComponent },
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