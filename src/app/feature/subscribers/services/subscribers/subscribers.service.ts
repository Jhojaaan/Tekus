import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { subscribersModel } from '../../models/subscribers.model';
import { subscriberModel } from '../../models/subscribers.model';

/**
 * Servicio encargado de gestionar las operaciones relacionadas con los suscriptores
 */
@Injectable()
export class SubscribersService {
  /**
   * Crea una instancia del servicio
   * @param httpClient Servicio HTTP de Angular
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtiene la lista de suscriptores
   * @param page Número de página
   * @param count Cantidad de suscriptores por página
   * @returns Un Observable que emite un objeto subscribersModel
   */
  public subscribersList({
    page,
    count,
  }: {
    page: number;
    count: number;
  }): Observable<subscribersModel> {
    return this.httpClient.get<subscribersModel>(
      `${environment.apiUrl}subscribers/`,
      {
        params: {
          page: page.toString(),
          count: count.toString(),
        },
      }
    );
  }

  /**
   * Actualiza los datos de un suscriptor
   * @param id Identificador del suscriptor
   * @param subscriberBody Objeto con los datos del suscriptor a actualizar
   * @returns Un Observable que emite un objeto subscribersModel
   */
  public editSubscriber(
    id: number,
    subscriberBody: subscriberModel
  ): Observable<subscribersModel> {
    return this.httpClient.put<subscribersModel>(
      `${environment.apiUrl}subscribers/${id}`,
      subscriberBody
    );
  }

  /**
   * Agrega un nuevo suscriptor
   * @param subscriberBody Objeto con los datos del nuevo suscriptor
   * @returns Un Observable que emite un objeto subscriberModel
   */
  public addSubscriber(
    subscriberBody: subscriberModel
  ): Observable<subscriberModel> {
    return this.httpClient.post<subscriberModel>(
      `${environment.apiUrl}subscribers/`,
      {
          Subscribers: [{

            ...subscriberBody,
            JobTitle: "",
            Topics:[]
          }
          ]
      }
    );
  }

  /**
   * Elimina un suscriptor
   * @param id Identificador del suscriptor a eliminar
   * @returns Un Observable que emite un objeto subscriberModel
   */
  public deleteSubscriber(id: number): Observable<subscriberModel> {
    return this.httpClient.delete<subscriberModel>(
      `${environment.apiUrl}subscribers/${id}`
    )
  }

}
