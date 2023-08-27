import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
const MOVIL_SIZE = 802;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() visible: boolean = true;
  isMobileResize: boolean = false;
  isElementVisible: boolean = true;
  @Output() buscardor: EventEmitter<Inmueble> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any): void {
    this.isMobileResize = window?.innerWidth < MOVIL_SIZE
      ? true
      : false;
    if (this.isMobileResize) {
      this.isElementVisible = false;
    } else {
      this.isElementVisible = true;
    }
  }
  toggleElement(): void {
    this.isElementVisible = !this.isElementVisible;
  }
  buscar($event): void {
    this.buscardor.emit($event);
  }
  
}
