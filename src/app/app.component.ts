import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  responsiveClass: any;
  constructor() {
  }
  openAside(responsiveClass: any) { 
    this.responsiveClass = responsiveClass;
  }
}
