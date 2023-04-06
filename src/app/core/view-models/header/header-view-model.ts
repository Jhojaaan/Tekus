import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class HeaderViewModel {

    /**
   * Constructor de la clase.
   * @param authService - Servicio de autenticación utilizado para cerrar la sesión del usuario.
   */
    constructor(private readonly authService: AuthService){}

    /**
   * Cierra la sesión del usuario actual.
   * Elimina el token de autenticación del almacenamiento local y redirige al usuario a la página de inicio de sesión.
   */
    public logOut(){
        // Elimina el token de autenticación del almacenamiento local.
        this.authService.removeToken();
        // Redirige al usuario a la página de inicio de sesión.
        this.authService.routeToLogin();
    }

}
