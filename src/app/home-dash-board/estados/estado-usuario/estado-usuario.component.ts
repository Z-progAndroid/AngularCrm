import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/interfaces/table-column';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';
import { Alerts } from 'src/app/utils/Alerts';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-estado-usuario',
  templateUrl: './estado-usuario.component.html',
  styleUrls: ['./estado-usuario.component.scss']
})
export class EstadoUsuarioComponent implements OnInit {
  estadoUsuarioForm: FormGroup
  estadosUsuario: EstadoUsuario[]
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'idEstadoUsuario' },
    { name: 'Estado', dataKey: 'estadoUsuario' },
  ];
  constructor(
    private fb: FormBuilder,
    private estadoUsuarioService: EstadoUsuarioService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarEstadoUsuario();
  }
  submit() {
    Alerts.warning('Avertencia', 'Estas seguro de guardar este registro?', 'Si, Guardar!').then(
      (result: any) => {
        if (!result.isConfirmed) {
          Alerts.info('Informacion', 'Operacion cancelada por el usuario!');
          this.estadoUsuarioForm.reset();
          return
        };
        this.estadoUsuarioService.save(this.estadoUsuario).subscribe(
          (estadoUsuario: EstadoUsuario) => {
            Alerts.success('Exito', 'Estado guardado con exito.');
            this.estadoUsuarioForm.reset();
            this.cargarEstadoUsuario();
          }, error => Alerts.error('Error', 'Error al guardar el estado.', error));
      });
  }
  crearFormulario() {
    this.estadoUsuarioForm = this.fb.group({
      idEstadoUsuario: ['', Validators.required],
      estadoUsuario: ['', Validators.required],
      fechaCreacion: ['']
    });
  }
  cargarEstadoUsuario() {
    this.estadoUsuarioService.findAll().subscribe(estadosUsuario => {
      this.estadosUsuario = estadosUsuario;
    }, error => Alerts.error('Error', 'Error al cargar los estados.', error));
  }
  private get estadoUsuario(): EstadoUsuario {
    let estadoUsuario: EstadoUsuario = new EstadoUsuario();
    estadoUsuario.idEstadoUsuario = this.estadoUsuarioForm.get('idEstadoUsuario').value
    estadoUsuario.estadoUsuario = this.estadoUsuarioForm.get('estadoUsuario').value
    estadoUsuario.fechaCreacion = Utils.isNullOrUndefined(this.estadoUsuarioForm.get('fechaCreacion').value)
      ? new Date()
      : this.estadoUsuarioForm.get('fechaCreacion').value;
    estadoUsuario.fechaModificacion = new Date();
    estadoUsuario.modificado = this.authService.getUsername();
    return estadoUsuario;
  }
  delete($event) {
    Alerts.warning('Avertencia', 'Estas seguro de eliminar este registro?', 'Si, Eliminar').then(
      (result: any) => {
        if (!result.isConfirmed) {
          Alerts.info('Informacion', 'Operacion cancelada por el usuario');
          this.estadoUsuarioForm.reset();
          return
        };
        this.estadoUsuarioService.delete($event.idEstadoUsuario).subscribe(
          (mensaje: any) => {
            Alerts.success('Exito', 'Estado eliminado con exito.');
            this.estadoUsuarioForm.reset();
            this.cargarEstadoUsuario();
          }, error => Alerts.error('Error', 'Error al eliminar el estado.', error));
      });
  }
  export($event) {
    this.estadoUsuarioService.exportarExcel(this.tableColumns.map(x => x.name), $event).subscribe((data) => {
      Utils.descargarFichero(data, 'estado-usuarios.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      Alerts.error('Error', 'Error al exportar los estados de los usuarios usuarios', error);
    });
  }
  edit($event) {
    this.estadoUsuarioService.findById($event.idEstadoUsuario).subscribe(
      (estadoUsuario: EstadoUsuario) => {
        this.estadoUsuarioForm.patchValue(estadoUsuario);
        this.estadoUsuarioForm.enable();
      }, error => Alerts.error('Error', 'Error al editar el estado.', error));
  }
}