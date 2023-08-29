import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StayListComponent } from './stay-list/stay-list.component';
import { DetailComponent } from './stay-list/detail/detail.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
  { path: 'listado', component: StayListComponent, },
  { path: 'detalle/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home-dashboard', loadChildren: () => import('src/app/home-dash-board/home-dash-board-routing.module').then(m => m.HomeDashBoardRoutingModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }