import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChartService } from 'src/app/services/chart.service';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  responsiveClass: any;
  constructor() {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  openAside(responsiveClass: any) {
    this.responsiveClass = responsiveClass;
  }
}
  
