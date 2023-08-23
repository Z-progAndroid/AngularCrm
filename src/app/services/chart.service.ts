import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Chart } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  doughnut(labels: string[], data: number[], backgroundColor: string[], id: string, idparagrafo: string) {
    const graph = document.getElementById(id) as HTMLCanvasElement;
    const pagrafo = document.getElementById(idparagrafo);
    const total = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    if (pagrafo) {
      pagrafo.innerHTML = `Total ${total}`;
    }
    const chartConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor,
            hoverOffset: 4
          }
        ]
      },
      options: {
        plugins: {
        
          tooltip: {
            callbacks: {
              label: (context) => {
                return context.label + ': ' + context.parsed;
              }
            }
          }
        }
      }
    };
    new Chart(graph, chartConfig);
  }
  bar(labels, datos, colors, id, idparagrafo) {
    const graph = document.querySelector(`#${id}`) as HTMLCanvasElement;
    const pagrafo = document.querySelector(`#${idparagrafo}`);
    const total = datos.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    pagrafo.innerHTML = `Total ${total}`;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Visitas',
        data: datos,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    };
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    new Chart(graph, config);
  }
  barHorizontal(labels, datos, colors, id, idparagrafo) {
    const graph = document.querySelector(`#${id}`)as HTMLCanvasElement;
    const pagrafo = document.querySelector(`#${idparagrafo}`);
    const total = datos.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    pagrafo.innerHTML = `Total ${total}`;
    const data = {
        labels: [labels],
        datasets: [
            {
                label: 'Gastos',
                data: [20,50,80,90,10],
                borderColor: "#f32727",
                backgroundColor: "#f32727",
            },
            {
                label: 'Ingresos',
                data: [20,70,80,90,10],
                borderColor: "#76f013",
                backgroundColor:"#76f013",
            }
        ]
    };
    const config:ChartConfiguration = {
        type: 'bar',
        data: data
    };
    new Chart(graph, config);
}
}
