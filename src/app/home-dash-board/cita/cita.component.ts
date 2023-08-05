import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/utils/BaseComponent';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { Utils } from 'src/app/utils/Utils';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TipoCita } from 'src/app/models/tipo-cita';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';
import { EstadoCitasService } from 'src/app/services/estado-citas.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoCitas } from 'src/app/models/estado-citas';
import { Inmueble } from 'src/app/models/inmueble';
import { User } from 'src/app/models/user';
import { forkJoin } from 'rxjs';
import { Alerts } from 'src/app/utils/Alerts';
defineLocale('es', esLocale);

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent extends BaseComponent implements OnInit {

  clientes: User[] = [];
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private tipoCitaService: TipoCitaService,
    private estadoCitaService: EstadoCitasService,
    private inmuebleService: InmuebleService,
    private usuarioService: UsuarioService,
  ) { super(); }

  ngOnInit(): void {
    
  }
}