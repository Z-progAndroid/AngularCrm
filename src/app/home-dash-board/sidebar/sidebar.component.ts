import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuServiceService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() responsiveClass: any;
  menu: any[] = [];
  constructor(
    private menuService: MenuServiceService,
    private authService: AuthService
  ) {
    this.authService.isAgent()
      ?this.menu = menuService.getMenuAgente()
      : menuService.getMenu();
  }
}
