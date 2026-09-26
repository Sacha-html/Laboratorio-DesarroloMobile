import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/constants/tema';

interface BotonFavoritoProps {
  activo: boolean;
  onPress: () => void;
}

export function BotonFavorito({ activo, onPress }: BotonFavoritoProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Text style={[estilos.icono, activo && estilos.activo]}>{activo ? '★' : '☆'}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  icono: { fontSize: 24, color: colores.textoSecundario },
  activo: { color: '#E0A100' },
});
