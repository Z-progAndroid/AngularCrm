import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Barrio } from 'src/app/models/barrio';
import { Estadocontrato } from 'src/app/models/estadocontrato';
import { Inmueble } from 'src/app/models/inmueble';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { TipoInmueble } from 'src/app/models/tipo-inmueble';
import { TipoPago } from 'src/app/models/tipo-pago';
import { User } from 'src/app/models/user';
import { EstadoContratoService } from 'src/app/services/estado-contrato.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { TipoContratoService } from 'src/app/services/tipo-contrato.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CustomValidators } from 'src/app/utils/CustomValidators';

@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.scss']
})
export class ContratoDetailComponent implements OnInit {
  buscadorContratoFrom: FormGroup;
  inmuebles: Inmueble[] = [];
  botonSave: boolean = false;
  barrios: Barrio[] = [];
  tiposContrato: TipoContrato[] = [];
  tiposPago: TipoPago[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  tiposInmueble: TipoInmueble[] = [];
  usuariosAgentes: User[] = [];
  usuariosClientes: User[] = [];
  estadosContrato: Estadocontrato[] = [];
  minDate: Date = new Date();
  constructor(
    private inmuebleService: InmuebleService,
    private tipoPagoService: TipoPagoService,
    private tipocontratoService: TipoContratoService,
    private usuaruioService: UsuarioService,
    private estadoContratoService: EstadoContratoService,
    private fb: FormBuilder
  ) {
    this.buscadorContratoFrom = this.iniciarFormulario();
  }
  ngOnInit(): void {
    let user = new User();
    user.rol='CLIENTE';



    forkJoin([
      this.tipoPagoService.findAll(),
      this.tipocontratoService.findAll(),
      this.usuaruioService.findByRolRol('AGENTE'),
      this.usuaruioService.findByRolRol('CLIENTE'),
      this.inmuebleService.findAll(),
      this.estadoContratoService.findAll()
    ]).subscribe(
      ([tipoPago, tipoContrato, agentes,clientes ,inmueble,estadoContrato]) => {
        this.tiposPago = tipoPago;
        this.tiposContrato = tipoContrato;
        this.usuariosAgentes = agentes;
        this.usuariosClientes = clientes;
        this.inmuebles = inmueble;
        this.estadosContrato = estadoContrato;

      }, error => console.log(error));
    this.inmuebleService.findAll().subscribe((data: Inmueble[]) => {
      this.inmuebles = data;
    });
  }
  busqueda() {
    this.inmuebles = [];
    this.inmuebleService.search(this.formTOInmueble()).subscribe(
      (inmuebles: Inmueble[]) => {
        this.inmuebles = inmuebles;
      });
  }
  iniciarFormulario(): FormGroup {
    return this.fb.group({
      idContrato: [''],
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      fechaInicio: ['',[Validators.required,CustomValidators.fechaValidator]],
      fechaFin: ['',Validators.required],
      terminosYCondiciones: [''],
      valor: ['',Validators.required],
      observaciones: [''],
      tipoContrato: ['',Validators.required],
      tipoPago: ['',Validators.required],
      inmueble: ['',Validators.required],
      agente: ['',Validators.required],
      cliente: ['',Validators.required]
    });
  }
  formTOInmueble(): Inmueble {

    return;
  }
}
