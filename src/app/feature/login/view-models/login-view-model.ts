import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class LoginViewModel {

  /**
   * Crea una instancia del modelo de vista de inicio de sesión.
   *
   * @param loginService El servicio de inicio de sesión que se utilizará para enviar la solicitud de inicio de sesión al servidor.
   * @param router El enrutador de Angular que se utilizará para redirigir al usuario a la página de inicio después de que el inicio de sesión sea exitoso.
   * @param messageService El servicio de mensajes que se utilizará para mostrar errores si la solicitud de inicio de sesión falla.
   */

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    
  ) {}
  
   /**
   * Envía una solicitud de inicio de sesión al servidor con las credenciales del usuario especificado.
   *
   * @param user El modelo de usuario que contiene las credenciales de inicio de sesión.
   */
  public loginUser(user: UserModel): void {
    this.loginService.login(user).subscribe({
      next: (token: TokenModel) => {        
        localStorage.setItem('Token', token.Token);
        localStorage.setItem('Status', token.Status.toString())
        

        this.router.navigate(['/']);
      },
      error: ({error}) => {         
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ha ocurrido un error, ${error.error}` });
      },
    });
  }

}
