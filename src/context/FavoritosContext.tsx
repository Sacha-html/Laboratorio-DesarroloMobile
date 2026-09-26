import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CLAVE_ALMACENAMIENTO = 'favoritos-paises';

interface FavoritosContextoValor {
  favoritos: string[];
  esFavorito: (codigoIso3: string) => boolean;
  alternarFavorito: (codigoIso3: string) => void;
}

const FavoritosContexto = createContext<FavoritosContextoValor | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CLAVE_ALMACENAMIENTO)
      .then((guardado) => {
        if (guardado) setFavoritos(JSON.parse(guardado));
      })
      .catch(() => {})
      .finally(() => setCargado(true));
  }, []);

  useEffect(() => {
    if (cargado) {
      AsyncStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(favoritos)).catch(() => {});
    }
  }, [favoritos, cargado]);

  const esFavorito = useCallback(
    (codigoIso3: string) => favoritos.includes(codigoIso3),
    [favoritos],
  );

  const alternarFavorito = useCallback((codigoIso3: string) => {
    setFavoritos((actuales) =>
      actuales.includes(codigoIso3)
        ? actuales.filter((codigo) => codigo !== codigoIso3)
        : [...actuales, codigoIso3],
    );
  }, []);

  const valor = useMemo(
    () => ({ favoritos, esFavorito, alternarFavorito }),
    [favoritos, esFavorito, alternarFavorito],
  );

  return <FavoritosContexto.Provider value={valor}>{children}</FavoritosContexto.Provider>;
}

export function useFavoritos(): FavoritosContextoValor {
  const contexto = useContext(FavoritosContexto);
  if (!contexto) {
    throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  }
  return contexto;
}
