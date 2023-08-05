import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeDashBoardComponent } from './home-dash-board/home-dash-board.component';
import { NavbarComponent } from './home-dash-board/navbar/navbar.component';
import { SidebarComponent } from './home-dash-board/sidebar/sidebar.component';
import { DashboardComponent } from './home-dash-board/dashboard/dashboard.component';
import { UserComponent } from './home-dash-board/user/user.component';
import { InmuebleComponent } from './home-dash-board/inmueble/inmueble.component';
import { CitaComponent } from './home-dash-board/cita/cita.component';
import { ContratoComponent } from './home-dash-board/contrato/contrato.component';
import { SeguimientoComponent } from './home-dash-board/seguimiento/seguimiento.component';
import { TareaComponent } from './home-dash-board/tarea/tarea.component';
import { MenuServiceService } from './services/menu-service.service';
import { ChartService } from './services/chart.service';
import { TableComponent } from './home-dash-board/user/table/table.component';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './home-dash-board/user/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InmuebleTableComponent } from './home-dash-board/inmueble/inmueble-table/inmueble-table.component';
import { EstadoUsuarioService } from './services/estado-usuario.service';
import { InmuebleService } from './services/inmueble.service';
import { RolService } from './services/rol.service';
import { InmuebleDetailComponent } from './home-dash-board/inmueble/inmueble-detail/inmueble-detail.component';
import { EstadosComponent } from './home-dash-board/estados/estados.component';
import { EstadoContratosComponent } from './home-dash-board/estados/estado-contratos/estado-contratos.component';
import { CabeceraEstadosComponent } from './home-dash-board/estados/cabecera-estados/cabecera-estados.component';
import { EstadoContratoService } from './services/estado-contrato.service';
import { EstadoInmueblesComponent } from './home-dash-board/estados/estado-inmuebles/estado-inmuebles.component';
import { EstadoInmuebleService } from './services/estado-inmueble.service';
import { EstadoTareaComponent } from './home-dash-board/estados/estado-tarea/estado-tarea.component';
import { EstadoTareaService } from './services/estado-tarea.service';
import { EstadoUsuarioComponent } from './home-dash-board/estados/estado-usuario/estado-usuario.component';
import { EstadoCitasComponent } from './home-dash-board/estados/estado-citas/estado-citas.component';
import { TiposComponent } from './home-dash-board/tipos/tipos.component';
import { CabeceraTiposComponent } from './home-dash-board/tipos/cabecera-tipos/cabecera-tipos.component';
import { TipoContratosComponent } from './home-dash-board/tipos/tipo-contratos/tipo-contratos.component';
import { TipoInmueblesComponent } from './home-dash-board/tipos/tipo-inmuebles/tipo-inmuebles.component';
import { TipoPagosComponent } from './home-dash-board/tipos/tipo-pagos/tipo-pagos.component';
import { TipoSeguimientosComponent } from './home-dash-board/tipos/tipo-seguimientos/tipo-seguimientos.component';
import { TiposCitasComponent } from './home-dash-board/tipos/tipos-citas/tipos-citas.component';
import { HomeComponent } from './home/home.component';
import { UbicacionesComponent } from './home-dash-board/ubicaciones/ubicaciones.component';
import { BarriosComponent } from './home-dash-board/ubicaciones/barrios/barrios.component';
import { CabeceraCiudadesComponent } from './home-dash-board/ubicaciones/cabecera-ciudades/cabecera-ciudades.component';
import { MunicipiosComponent } from './home-dash-board/ubicaciones/municipios/municipios.component';
import { PaisComponent } from './home-dash-board/ubicaciones/pais/pais.component';
import { ProvinciaComponent } from './home-dash-board/ubicaciones/provincia/provincia.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{TimepickerModule} from 'ngx-bootstrap/timepicker';
import { CitaCrearComponent } from './home-dash-board/cita/cita-crear/cita-crear.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeDashBoardComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,
    InmuebleComponent,
    CitaComponent,
    ContratoComponent,
    SeguimientoComponent,
    TareaComponent,
    TableComponent,
    UserDetailsComponent,
    InmuebleTableComponent,
    InmuebleDetailComponent,
    EstadosComponent,
    EstadoContratosComponent,
    CabeceraEstadosComponent,
    EstadoInmueblesComponent,
    EstadoTareaComponent,
    EstadoUsuarioComponent,
    EstadoCitasComponent,
    TiposComponent,
    CabeceraTiposComponent,
    TipoContratosComponent,
    TipoInmueblesComponent,
    TipoPagosComponent,
    TipoSeguimientosComponent,
    TiposCitasComponent,
    TipoSeguimientosComponent,
    UbicacionesComponent,
    CabeceraCiudadesComponent,
    PaisComponent,
    ProvinciaComponent,
    MunicipiosComponent,
    BarriosComponent,
    HomeComponent,
    CitaCrearComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [ChartService,
    EstadoUsuarioService,
    InmuebleService,
    MenuServiceService,
    RolService,
    UsuarioService,
    EstadoContratoService,
    EstadoInmuebleService,
    EstadoTareaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
