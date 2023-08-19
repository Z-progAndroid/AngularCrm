import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDashBoardRoutingModule } from './home-dash-board-routing.module';
import { CitaCrearComponent } from './cita/cita-crear/cita-crear.component';
import { TareaEditarComponent } from './tarea/tarea-editar/tarea-editar.component';
import { ContratoEditarComponent } from './contrato/contrato-editar/contrato-editar.component';


@NgModule({
  declarations: [
    CitaCrearComponent,
    TareaEditarComponent,
    ContratoEditarComponent,
  ],
  imports: [
    CommonModule,
    HomeDashBoardRoutingModule
  ]
})
export class HomeDashBoardModule { }
