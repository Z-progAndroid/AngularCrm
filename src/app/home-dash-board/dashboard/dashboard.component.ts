import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChartService } from 'src/app/services/chart.service';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js'
import { GraficoService } from 'src/app/services/graficoService';
import { Grafico } from 'src/app/models/grafico';

const GRAFICO_CONTRATO = "contratosGraph";
const GRAFICO_CONTRATO_PARRAFO = "contratosGraphParagraph";
const GRAFICO_INMUEBLES = "inmueblesGraph";
const GRAFICO_INMUEBLES_PARRAFO = "inmueblesGraphParagraph";
const GRAFICO_CITAS = "citasGraph";
const GRAFICO_CITAS_PARRAFO = "citasGraphParagraph";
const GRAFICO_TAREA = "tareasGraph";
const GRAFICO_TAREA_PARRAFO = "tareasGraphParagraph";
const GRAFICO_VISITAS = "visitasGraph";
const GRAFICO_VISITAS_PARRAFO = "visitasGraphParagraph";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  responsiveClass: any;
  private etiquetasContratos: string[] = ['Pendientes', 'Vigentes', 'Cancelados'];
  colores: string[] = ['#001f3f', '#003366', '#004080', '#0059b3', '#0073e6', '#3385ff', '#66a3ff', '#99c2ff', '#cce0ff', '#e6f5ff'];
  constructor(
    private chartService: ChartService,
    private graficoService: GraficoService
  ) { }

  ngOnInit(): void {
    this.graficoService.graficoAdmin().subscribe((grafico: Grafico) => {
      this.generarGrafico(grafico);
    }); 

    // this.graficoService.graficoAgente(2).subscribe((grafico: Grafico) => {
    //   this.generarGrafico(grafico);
    // });
  }
  openAside(responsiveClass: any) {
    this.responsiveClass = responsiveClass;
  }
  generarGrafico(grafico: Grafico) {
    this.chartService.doughnut(Object.keys(grafico?.contratos)
      , Object.values(grafico?.contratos)
      , this.colores.slice(0, Object.keys(grafico.contratos).length)
      , GRAFICO_CONTRATO, GRAFICO_CONTRATO_PARRAFO)
    this.chartService.doughnut(Object.keys(grafico?.inmuebles)
      , Object.values(grafico?.inmuebles)
      , this.colores.slice(0, Object.keys(grafico.inmuebles).length)
      , GRAFICO_INMUEBLES, GRAFICO_INMUEBLES_PARRAFO)
    this.chartService.doughnut(Object.keys(grafico?.citas)
      , Object.values(grafico?.citas)
      , this.colores.slice(0, Object.keys(grafico.citas).length)
      , GRAFICO_CITAS, GRAFICO_CITAS_PARRAFO)
    this.chartService.doughnut(Object.keys(grafico?.tareas)
      , Object.values(grafico?.tareas)
      , this.colores.slice(0, Object.keys(grafico.tareas).length)
      , GRAFICO_TAREA, GRAFICO_TAREA_PARRAFO)
    this.chartService.bar(Object.keys(grafico?.visitas)
      , Object.values(grafico?.visitas)
      , this.colores.slice(0, Object.keys(grafico?.visitas).length)
      , GRAFICO_VISITAS, GRAFICO_VISITAS_PARRAFO)
  }
}
