import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './cita/cita.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
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

const routes: Routes = [
  {
    path: '', component: HomeDashBoardComponent, children: [
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
      { path: 'tipos', component: TiposComponent },
      { path: 'ciudad', component: CiudadesComponent },
      { path: 'cita', component: CitaComponent },
      { path: 'contrato', component: ContratoComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
      { path: 'tarea', component: TareaComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDashBoardRoutingModule { }
