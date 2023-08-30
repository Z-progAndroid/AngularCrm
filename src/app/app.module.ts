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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './home-dash-board/user/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InmuebleDetailComponent } from './home-dash-board/inmueble/inmueble-detail/inmueble-detail.component';
import { EstadosComponent } from './home-dash-board/estados/estados.component';
import { EstadoContratosComponent } from './home-dash-board/estados/estado-contratos/estado-contratos.component';
import { CabeceraEstadosComponent } from './home-dash-board/estados/cabecera-estados/cabecera-estados.component';
import { EstadoInmueblesComponent } from './home-dash-board/estados/estado-inmuebles/estado-inmuebles.component';
import { EstadoTareaComponent } from './home-dash-board/estados/estado-tarea/estado-tarea.component';
import { EstadoUsuarioComponent } from './home-dash-board/estados/estado-usuario/estado-usuario.component';
import { EstadoCitasComponent } from './home-dash-board/estados/estado-citas/estado-citas.component';
import { TiposComponent } from './home-dash-board/tipos/tipos.component';
import { CabeceraTiposComponent } from './home-dash-board/tipos/cabecera-tipos/cabecera-tipos.component';
import { TipoContratosComponent } from './home-dash-board/tipos/tipo-contratos/tipo-contratos.component';
import { TipoInmueblesComponent } from './home-dash-board/tipos/tipo-inmuebles/tipo-inmuebles.component';
import { TipoPagosComponent } from './home-dash-board/tipos/tipo-pagos/tipo-pagos.component';
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
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CitaCrearComponent } from './home-dash-board/cita/cita-crear/cita-crear.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TareaEditarComponent } from './home-dash-board/tarea/tarea-editar/tarea-editar.component';
import { ContratoEditarComponent } from './home-dash-board/contrato/contrato-editar/contrato-editar.component';
import { ComonTableComponent } from './comon-components/comon-table/comon-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DataPropertyGetterPipe } from './pipes/DataPropertyGetterPipe';
import { DatePipe } from '@angular/common';
import { BarrioService } from './services/barrio.service';
import { ChartService } from './services/chart.service';
import { CitasService } from './services/citas.service';
import { ContratoService } from './services/contrato.service';
import { EstadoCitasService } from './services/estado-citas.service';
import { EstadoContratoService } from './services/estado-contrato.service';
import { EstadoInmuebleService } from './services/estado-inmueble.service';
import { EstadoTareaService } from './services/estado-tarea.service';
import { EstadoUsuarioService } from './services/estado-usuario.service';
import { InmuebleService } from './services/inmueble.service';
import { MunicipioService } from './services/municipio.service';
import { PaisService } from './services/pais.service';
import { ProvinciaService } from './services/provincia.service';
import { RolService } from './services/rol.service';
import { TareaService } from './services/tarea.service';
import { TipoCitaService } from './services/tipo-cita.service';
import { TipoContratoService } from './services/tipo-contrato.service';
import { TipoInmuebleService } from './services/tipo-inmueble.service';
import { TipoPagoService } from './services/tipo-pago.service';
import { UsuarioService } from './services/usuario.service';
import { MenuServiceService } from './services/menu-service.service';
import { StayListComponent } from './stay-list/stay-list.component';
import { HeaderComponent } from './stay-list/header/header.component';
import { FooterComponent } from './stay-list/footer/footer.component';
import { DetailComponent } from './stay-list/detail/detail.component';
import { FilterComponent } from './stay-list/filter/filter.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { TokenExpirationInterceptor } from './interceptor/token-expiration.interceptor';
import { LoginComponent } from './login/login/login.component';
import { CitasComponent } from './stay-list/citas/citas.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
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
    UserDetailsComponent,
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
    TiposCitasComponent,
    UbicacionesComponent,
    CabeceraCiudadesComponent,
    PaisComponent,
    ProvinciaComponent,
    MunicipiosComponent,
    BarriosComponent,
    HomeComponent,
    CitaCrearComponent,
    TareaEditarComponent,
    ContratoEditarComponent,
    ComonTableComponent,
    DataPropertyGetterPipe,
    StayListComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent,
    FilterComponent,
    LoginComponent,
    CitasComponent
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
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [
    BarrioService,
    ChartService,
    CitasService,
    ContratoService,
    EstadoCitasService,
    EstadoContratoService,
    EstadoInmuebleService,
    EstadoTareaService,
    EstadoUsuarioService,
    InmuebleService,
    MenuServiceService,
    MunicipioService,
    PaisService,
    ProvinciaService,
    RolService,
    TareaService,
    TipoCitaService,
    TipoContratoService,
    TipoInmuebleService,
    TipoPagoService,
    UsuarioService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpirationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
