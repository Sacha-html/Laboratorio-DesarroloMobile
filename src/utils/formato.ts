export function formatearToneladas(valor: number): string {
  return `${valor.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} t`;
}

export function urlBandera(codigoIso2: string, ancho = 160): string {
  return `https://flagcdn.com/w${ancho}/${codigoIso2.toLowerCase()}.png`;
}
