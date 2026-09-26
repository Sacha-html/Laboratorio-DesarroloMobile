import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { colores } from '@/constants/tema';

const clienteConsultas = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function LayoutRaiz() {
  return (
    <QueryClientProvider client={clienteConsultas}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.primario },
          headerTintColor: '#FFFFFF',
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Emisiones de CO2' }} />
      </Stack>
    </QueryClientProvider>
  );
}
