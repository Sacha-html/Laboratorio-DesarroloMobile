import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { colores } from '@/constants/tema';
import { FavoritosProvider } from '@/context/FavoritosContext';

const clienteConsultas = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function LayoutRaiz() {
  return (
    <QueryClientProvider client={clienteConsultas}>
      <FavoritosProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colores.primario },
            headerTintColor: '#FFFFFF',
            contentStyle: { backgroundColor: colores.fondo },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Emisiones de CO2' }} />
          <Stack.Screen name="pais/[codigo]" options={{ title: 'Detalle del país' }} />
        </Stack>
      </FavoritosProvider>
    </QueryClientProvider>
  );
}
