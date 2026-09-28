import { useQuery } from '@tanstack/react-query';

import {
  obtenerEmisionesRecientes,
  obtenerSerieHistorica,
} from '@/services/bancoMundial';

const UN_DIA_EN_MS = 24 * 60 * 60 * 1000;

export function usePaisesEmisiones() {
  return useQuery({
    queryKey: ['emisiones', 'paises'],
    queryFn: obtenerEmisionesRecientes,
    staleTime: UN_DIA_EN_MS,
  });
}

export function useSerieHistorica(codigoIso3: string) {
  return useQuery({
    queryKey: ['emisiones', 'serie', codigoIso3],
    queryFn: () => obtenerSerieHistorica(codigoIso3),
    staleTime: UN_DIA_EN_MS,
  });
}
