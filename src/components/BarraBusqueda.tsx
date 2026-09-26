import { StyleSheet, TextInput } from 'react-native';

import { colores, espaciado } from '@/constants/tema';

interface BarraBusquedaProps {
  valor: string;
  onCambiar: (texto: string) => void;
  placeholder?: string;
}

export function BarraBusqueda({
  valor,
  onCambiar,
  placeholder = 'Buscar país por nombre',
}: BarraBusquedaProps) {
  return (
    <TextInput
      value={valor}
      onChangeText={onCambiar}
      placeholder={placeholder}
      placeholderTextColor={colores.textoSecundario}
      style={estilos.entrada}
      autoCorrect={false}
      clearButtonMode="while-editing"
      accessibilityLabel={placeholder}
    />
  );
}

const estilos = StyleSheet.create({
  entrada: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: espaciado.m,
    paddingVertical: espaciado.s + 2,
    color: colores.texto,
    fontSize: 15,
  },
});
