import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountriesModel } from '../../models/country.model';

/**
 * Servicio que se encarga de obtener la lista de países desde la API.
 */

@Injectable()
export class CountriesService {

   /**
   * Constructor del servicio.
   * @param httpClient Módulo de Angular para realizar peticiones HTTP.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene la lista de países desde la API.
   * @returns Un observable que emite el objeto CountriesModel con la lista de países.
   */
  public getCountries(): Observable<CountriesModel> {
    return this.httpClient.get<CountriesModel>(
      `${environment.apiUrl}countries/`,
      {
        params: {
          Count: 255,
        },
      }
    );
  }
}
