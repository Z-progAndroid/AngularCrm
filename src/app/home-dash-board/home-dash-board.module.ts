import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDashBoardRoutingModule } from './home-dash-board-routing.module';
import { CitaCrearComponent } from './cita/cita-crear/cita-crear.component';


@NgModule({
  declarations: [
    CitaCrearComponent,
  ],
  imports: [
    CommonModule,
    HomeDashBoardRoutingModule
  ]
})
export class HomeDashBoardModule { }
