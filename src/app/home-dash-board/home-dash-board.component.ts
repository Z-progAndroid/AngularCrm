import { Component } from '@angular/core';

@Component({
  selector: 'app-home-dash-board',
  templateUrl: './home-dash-board.component.html',
  styleUrls: ['./home-dash-board.component.scss']
})
export class HomeDashBoardComponent {
  responsiveClass: any;
  constructor() {
  }
  openAside(responsiveClass: any) { 
    this.responsiveClass = responsiveClass;
  }
}
