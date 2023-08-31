import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
const MOVIL_SIZE = 802;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  tituloRedes: string = 'Redes Sociales';
  copyright: string = '© 2023 Inmozara';
  tituloContacto: string = 'Contacto';
  isMobileResize: boolean = false;
  logeado: boolean = false;
  redesSociales: any[] = [
    {
      nombre: 'Facebook',
      url: 'https://www.facebook.com/inmozarasanjose',
      icon: "fab fa-facebook-f color-icono me-1",
      target: "_blank"
    },
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/inmozara/',
      icon: "fab fa-instagram color-icono me-1",
      target: "_blank"
    },
  ];
  direcciones: any[] = [
    {
      titulo: 'Inmozara - Almozara',
      direccion: 'Av. de Pablo Gargallo, 72, 50003 Zaragoza',
      direccionIcon: "fas fa-home color-icono me-1",
      linkDireccion: 'https://www.google.com/maps/place/Inmozara/@41.6607032,-0.8981492,17z/data=!3m1!4b1!4m6!3m5!1s0xd5914b686012003:0x3ab6596522171d21!8m2!3d41.6607032!4d-0.8981492!16s%2Fg%2F1tfty8n0?entry=ttu',
      linkDireccionTarget: "_blank",
      telefono: '976404669 - 600251724',
      telfonnoIcon: "fas fa-phone-alt color-icono",
      email: 'sanjose@inmozara.es',
      emailIcon: "fas fa-envelope me-1 color-icono",
    },
    {
      titulo: 'Inmozara - Torrero',
      direccion: 'C/ de Fray Julián Garcés, 27, 50007 Zaragoza',
      direccionIcon: "fas fa-home color-icono me-1",
      linkDireccion: 'https://www.google.com/maps/place/Inmozara+Torrero/@41.6305521,-0.8889296,17z/data=!3m1!4b1!4m6!3m5!1s0xd59152278e5e139:0x16eaa355f3f0586f!8m2!3d41.6305481!4d-0.8867409!16s%2Fg%2F11c5zwkvj8?coh=164777&entry=tt&shorturl=1',
      linkDireccionTarget: "_blank",
      telefono: '976375319 - 600252375',
      telfonnoIcon: "fas fa-phone-alt color-icono",
      email: 'inmozara_torrero@hotmail.com',
      emailIcon: "fas fa-envelope me-1 color-icono",
    },
    {
      titulo: 'Inmozara - San José',
      direccion: 'C/ de Juana de Ibarbourou, 4, 50013 Zaragoza',
      direccionIcon: "fas fa-home color-icono me-1",
      linkDireccion: 'https://www.google.com/maps/place/INMOZARA+San+Jos%C3%A9/@41.6426151,-0.8738113,17z/data=!3m1!4b1!4m6!3m5!1s0xd591500db60248b:0xfe4a87fdfd7db582!8m2!3d41.6426112!4d-0.8693266!16s%2Fg%2F11h1mffyv9?coh=164777&entry=tt&shorturl=1',
      linkDireccionTarget: "_blank",
      telefono: ' 976081427 - 976027638',
      telfonnoIcon: "fas fa-phone-alt color-icono",
      email: 'sanjose@inmozara.es',
      emailIcon: "fas fa-envelope me-1 color-icono",
    }
  ];
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.logeado = this.authService.getToken() ? true : false;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any): void {
    this.isMobileResize = window?.innerWidth < MOVIL_SIZE
      ? true
      : false;
  }
  logout(): void {
    this.authService.logout();
  }
}
