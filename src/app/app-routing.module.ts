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
import { TiposComponent } from './home-dash-board/tipos/tipos.component';
import { CiudadesComponent } from './home-dash-board/ciudades/ciudades.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-dashboard', pathMatch: 'full' },
  { path: 'home-dashboard', loadChildren: () => import('src/app/home-dash-board/home-dash-board-routing.module').then(m => m.HomeDashBoardRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }