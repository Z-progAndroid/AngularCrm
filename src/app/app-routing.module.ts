import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StayListComponent } from './stay-list/stay-list.component';
import { DetailComponent } from './stay-list/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'listado', pathMatch: 'full' },
  { path: 'listado', component: StayListComponent, },
  { path: 'detalle/:id', component: DetailComponent },
  { path: 'home-dashboard', loadChildren: () => import('src/app/home-dash-board/home-dash-board-routing.module').then(m => m.HomeDashBoardRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }