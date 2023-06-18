import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() usuarios: any[] = [];
  constructor(private router: Router, private usuarioService: UsuarioService,
  private location: Location) { }
  onEdit(id: number) {
    this.router.navigate(['/home-dashboard/user/editar', id]);
  }
  onView(id: number) {
    this.router.navigate(['/home-dashboard/user/ver', id]);
  }
  onDelete(id: number) {
    this.usuarioService.delete(id).subscribe((data: any) => {
      this.location.go(this.location.path());
      window.location.reload();
    }), error => {
      console.log(error);
    }
  }
}
