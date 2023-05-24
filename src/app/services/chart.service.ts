import { Injectable } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private charts: Chart[] = [];

  constructor() { }


}
