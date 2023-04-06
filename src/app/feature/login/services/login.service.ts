import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

/**
 * Servicio que se encarga de gestionar las peticiones de inicio de sesion
 */
@Injectable()
export class LoginService {
  /**
   * Crea una instancia del servicio de inicio de sesión.
   *
   * @param httpClient El cliente HTTP para realizar las peticiones.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Envía una solicitud de inicio de sesión al servidor.
   *
   * @param user El modelo de usuario con las credenciales de inicio de sesión.
   * @returns Un observable que emite el token de acceso si el inicio de sesión es exitoso.
   */
  public login(user: UserModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(
      `${environment.apiUrl}account/login`,
      user
    );
  }
}
