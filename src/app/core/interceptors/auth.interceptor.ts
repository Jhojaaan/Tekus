import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private totalPeticiones = 0;

  /**
   * Constructor de los servicios
   * @param authService - Servicio de autenticacion para obtener el token
   * @param spinnerService - Servicio ngx-spinner para mostrar el spinner de carga
   */
  constructor(public authService: AuthService, private spinnerService: NgxSpinnerService) {}

  /**
   * Intercepta las solicitudes HTTP, agrega encabezados y se muestra / esconde el loader
   * @params request - La solicitud HTTP a interceptar
   * @params next - El siguiente manipulador de solicitudes HTTP en la cadena
   * @returns El observable de la respuesta HTTP modificada.
   */



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Suma uno al contador de peticiones y muestra el spinner
    this.totalPeticiones++;
    this.mostrarCargando()

    //Agrega los encabezados
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token.Token}`
        }
      });
    }

    //Envia la solicitud HTTP al siguiente manipulador
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.totalPeticiones--;
            if (this.totalPeticiones === 0) {
              this.ocultarCargando();
            }
          }
        },
        error: (error) => {
          this.totalPeticiones--;
          if (this.totalPeticiones === 0) {
            this.ocultarCargando();
          }
        },
      })
    );
  }

  /**
 * Muestra el spinner de carga utilizando el servicio ngx-spinner
 */
  mostrarCargando() {
    this.spinnerService.show();
  }

  /**
  * Oculta el spinner de carga utilizando el servicio ngx-spinner
  */
  ocultarCargando() {
    this.spinnerService.hide();
  }
}