/**
 * Modelo que representa la lista de suscriptores
 */
export class subscribersModel {
  Count!: number;
  Data!: subscriberModel[];
}

/**
 * Modelo que representa un suscriptor
 */
export class subscriberModel {
  SystemId!: number | null;
  Area!: string;
  PublicId!: number;
  CountryCode!: string;
  CountryName!: string;
  EndpointsCount!: number;
  Name!: string;
  Email!: string;
  JobTitle!: string;
  PhoneNumber!: string;
  PhoneCode!: string;
  PhoneCodeAndNumber!: string;
  LastActivityUtc!: string | null;
  LastActivity!: string | null;
  LastActivityString!: string | null;
  SubscriptionDate!: string | null;
  SubscriptionMethod!: number;
  SubscriptionState!: number;
  SubscriptionStateDescription!: string;
  Topics!: string[];
  ValidEmail!: boolean;
  Activity!: string;
  ConnectionState!: number;
  Id!: number;
}
