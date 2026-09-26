import type {
  PaisApi,
  PaisEmision,
  PuntoSerie,
  RegistroEmisionApi,
} from '@/types/emisiones';

const URL_BASE = 'https://api.worldbank.org/v2';
const INDICADOR = 'EN.GHG.CO2.PC.CE.AR5';
const REGION_AGREGADOS = 'Aggregates';

async function pedirJson<T>(url: string): Promise<T[]> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`El Banco Mundial respondio con estado ${respuesta.status}`);
  }
  const cuerpo = await respuesta.json();
  if (!Array.isArray(cuerpo) || !Array.isArray(cuerpo[1])) {
    throw new Error('La respuesta del Banco Mundial no tiene el formato esperado');
  }
  return cuerpo[1] as T[];
}

export async function obtenerEmisionesRecientes(): Promise<PaisEmision[]> {
  const [registros, paises] = await Promise.all([
    pedirJson<RegistroEmisionApi>(
      `${URL_BASE}/country/all/indicator/${INDICADOR}?format=json&per_page=400&mrnev=1`,
    ),
    pedirJson<PaisApi>(`${URL_BASE}/country?format=json&per_page=400`),
  ]);

  const paisesPorCodigo = new Map(
    paises
      .filter((pais) => pais.region.value !== REGION_AGREGADOS)
      .map((pais) => [pais.id, pais]),
  );

  const resultado: PaisEmision[] = [];
  for (const registro of registros) {
    const pais = paisesPorCodigo.get(registro.countryiso3code);
    if (!pais || registro.value === null) continue;
    resultado.push({
      codigoIso3: pais.id,
      codigoIso2: pais.iso2Code,
      nombre: pais.name,
      region: pais.region.value.trim(),
      capital: pais.capitalCity,
      nivelIngreso: pais.incomeLevel.value,
      valor: registro.value,
      anio: Number(registro.date),
    });
  }
  return resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

export async function obtenerSerieHistorica(
  codigoIso3: string,
): Promise<PuntoSerie[]> {
  const registros = await pedirJson<RegistroEmisionApi>(
    `${URL_BASE}/country/${codigoIso3}/indicator/${INDICADOR}?format=json&per_page=100`,
  );
  return registros
    .filter((registro) => registro.value !== null)
    .map((registro) => ({
      anio: Number(registro.date),
      valor: registro.value as number,
    }))
    .sort((a, b) => a.anio - b.anio);
}
