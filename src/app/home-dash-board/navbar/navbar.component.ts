import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() openAside = new EventEmitter<any>();
  defaultStatus = true;
  responsiveClass: any;
  constructor() { }

  abrirAside(status: boolean) {
    if (status === this.defaultStatus) {
      this.defaultStatus = false;
      this.responsiveClass = {
        'display': 'block'
      };
      this.openAside.emit(this.responsiveClass);
    } else {
      this.defaultStatus = true;
      this.responsiveClass = {
        'display': 'none'
      };
      this.openAside.emit(this.responsiveClass);
    }
  }
}
