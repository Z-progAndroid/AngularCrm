import { Component, Input } from '@angular/core';
import { MenuServiceService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() responsiveClass: any;
  menu: any[] = [];
  constructor(private menuService: MenuServiceService) {
    this.menu = menuService.getMenu();
  }
}
