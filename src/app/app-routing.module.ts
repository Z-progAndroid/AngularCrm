import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home-dashboard', pathMatch: 'full' },
  { path: 'home-dashboard', loadChildren: () => import('src/app/home-dash-board/home-dash-board-routing.module').then(m => m.HomeDashBoardRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }