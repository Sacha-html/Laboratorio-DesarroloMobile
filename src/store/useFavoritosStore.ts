import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritosState {
  favoritos: string[];
  esFavorito: (codigoIso3: string) => boolean;
  alternarFavorito: (codigoIso3: string) => void;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: [],

      esFavorito: (codigoIso3: string) => get().favoritos.includes(codigoIso3),

      alternarFavorito: (codigoIso3: string) => {
        const { favoritos } = get();
        set({
          favoritos: favoritos.includes(codigoIso3)
            ? favoritos.filter((c) => c !== codigoIso3)
            : [...favoritos, codigoIso3],
        });
      },
    }),
    {
      name: 'favoritos-paises',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
