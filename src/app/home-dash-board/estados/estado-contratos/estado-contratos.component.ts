import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estadocontrato } from 'src/app/models/estadocontrato';
import { EstadoContratoService } from 'src/app/services/estado-contrato.service';

@Component({
  selector: 'app-estado-contratos',
  templateUrl: './estado-contratos.component.html',
  styleUrls: ['./estado-contratos.component.scss']
})
export class EstadoContratosComponent implements OnInit {
  estadocontratoForm: FormGroup;
  estadosContrato: Estadocontrato[];
  constructor(
    private fb: FormBuilder,
    private estadocontratoService: EstadoContratoService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.estadocontratoService.findAll().subscribe((data: Estadocontrato[]) => {
      this.estadosContrato = data;
    }), (error) => {
      console.log(error);
    }
  }

  createForm() {
    this.estadocontratoForm = this.fb.group({
      idEstadoContrato: ['', [Validators.required]],
      estadoContrato: ['', [Validators.required]]
    });
  }

  submit() {
    let estadoContrato: Estadocontrato = new Estadocontrato();
    estadoContrato.idestadoContrato = this.estadocontratoForm.get('idEstadoContrato').value;
    estadoContrato.estado = this.estadocontratoForm.get('estadoContrato').value;
    estadoContrato.fechaCreacion = new Date();
    estadoContrato.fechaModificacion = new Date();
    estadoContrato.modificado = 'N';
    console.log(estadoContrato);
    this.estadocontratoService.save(estadoContrato).subscribe((data: Estadocontrato) => {
      console.log(data);
      this.estadocontratoService.findAll().subscribe((data: Estadocontrato[]) => {
        this.estadosContrato = data;
      }), (error) => console.log(error);
    }), (error) => console.log(error);

  }
  ver(id: number) {
    this.estadocontratoService.findById(id).subscribe((data: Estadocontrato) => {
      console.log(data);
      this.estadocontratoForm.get('idEstadoContrato').setValue(data.idestadoContrato);
      this.estadocontratoForm.get('estadoContrato').setValue(data.estado);
      this.estadocontratoForm.disable();
  
    }), (error) => console.log(error);
  }
  editar(id: number) {
    this.estadocontratoService.findById(id).subscribe((data: Estadocontrato) => {
      console.log(data);
      this.estadocontratoForm.get('idEstadoContrato').setValue(data.idestadoContrato);
      this.estadocontratoForm.get('estadoContrato').setValue(data.estado);
      this.estadocontratoForm.enable();
    }), (error) => console.log(error);
  }
  eliminar(id: number) {
    this.estadocontratoService.delete(id).subscribe((data: any) => {
      console.log(data);
      this.estadosContrato = [];
      this.estadocontratoService.findAll().subscribe((data: Estadocontrato[]) => {
        this.estadosContrato = data;
      }), (error) => console.log(error);
    }), (error) => console.log(error);
  }
}
