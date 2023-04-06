import { Injectable } from '@angular/core';
import { CountriesService } from '../../services/countries/countries.service';
import { Observable} from 'rxjs';
import { CountriesModel } from '../../models/country.model';

@Injectable()
export class CountriesViewModel {
  /**
   * Constructor del servicio.
   * @param countriesService Servicio que se utiliza para hacer las llamadas a la API REST.
   */
  constructor(private readonly countriesService: CountriesService) {}

  /**
   * Obtiene la lista de países desde la API REST.
   * @returns Un objeto Observable que representa la respuesta de la API REST.
   */
  public getCountries(): Observable<CountriesModel> {
    return this.countriesService.getCountries()
  }
}
