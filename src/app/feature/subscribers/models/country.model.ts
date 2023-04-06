/**
 * Modelo que representa la lista de paises
 */
export class CountriesModel {
  Count!: number;
  Data!: CountryModel[];
}

/**
 * Modelo que representa un país
 */
export class CountryModel {
  Code!: string;
  Name!: string;
  PhoneCode!: string;
}