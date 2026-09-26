export interface RegistroEmisionApi {
  countryiso3code: string;
  date: string;
  value: number | null;
}

export interface PaisApi {
  id: string;
  iso2Code: string;
  name: string;
  region: { value: string };
  incomeLevel: { value: string };
  capitalCity: string;
}

export interface PaisEmision {
  codigoIso3: string;
  codigoIso2: string;
  nombre: string;
  region: string;
  capital: string;
  nivelIngreso: string;
  valor: number;
  anio: number;
}

export interface PuntoSerie {
  anio: number;
  valor: number;
}
