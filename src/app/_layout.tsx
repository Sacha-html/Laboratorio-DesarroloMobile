import { Stack } from 'expo-router';

import { colores } from '@/constants/tema';

export default function LayoutRaiz() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colores.primario },
        headerTintColor: '#FFFFFF',
        contentStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Emisiones de CO2' }} />
    </Stack>
  );
}
