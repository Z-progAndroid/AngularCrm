import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Alerts } from '../utils/Alerts';
@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
          this.authService.logout();
          this.router.navigate(['/login']);
          setTimeout(() => {
            Alerts.info('Info', 'Su sesión ha expirado. Por favor, vuelva a iniciar sesión.');
          }, 1500);
        }
        return throwError(error);
      })
    );
  }
}




