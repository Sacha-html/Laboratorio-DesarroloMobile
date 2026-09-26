import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colores, espaciado } from '@/constants/tema';

interface FiltroRegionesProps {
  regiones: string[];
  seleccionada: string | null;
  onSeleccionar: (region: string | null) => void;
}

export function FiltroRegiones({
  regiones,
  seleccionada,
  onSeleccionar,
}: FiltroRegionesProps) {
  const opciones: (string | null)[] = [null, ...regiones];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={estilos.contenedor}
    >
      {opciones.map((region) => {
        const activa = region === seleccionada;
        return (
          <Pressable
            key={region ?? 'todas'}
            onPress={() => onSeleccionar(region)}
            style={[estilos.chip, activa && estilos.chipActivo]}
          >
            <Text style={[estilos.texto, activa && estilos.textoActivo]}>
              {region ?? 'Todas'}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { gap: espaciado.s, paddingVertical: espaciado.s },
  chip: {
    paddingHorizontal: espaciado.m,
    paddingVertical: espaciado.s,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  chipActivo: { backgroundColor: colores.primario, borderColor: colores.primario },
  texto: { color: colores.texto, fontSize: 13 },
  textoActivo: { color: '#FFFFFF', fontWeight: '600' },
});
