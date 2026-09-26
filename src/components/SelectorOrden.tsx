import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, espaciado } from '@/constants/tema';

export type Orden = 'nombre' | 'mayor' | 'menor';

const opciones: { valor: Orden; etiqueta: string }[] = [
  { valor: 'nombre', etiqueta: 'A-Z' },
  { valor: 'mayor', etiqueta: 'Más emisión' },
  { valor: 'menor', etiqueta: 'Menos emisión' },
];

interface SelectorOrdenProps {
  orden: Orden;
  onCambiar: (orden: Orden) => void;
}

export function SelectorOrden({ orden, onCambiar }: SelectorOrdenProps) {
  return (
    <View style={estilos.contenedor}>
      {opciones.map((opcion) => {
        const activa = opcion.valor === orden;
        return (
          <Pressable
            key={opcion.valor}
            onPress={() => onCambiar(opcion.valor)}
            style={[estilos.opcion, activa && estilos.opcionActiva]}
          >
            <Text style={[estilos.texto, activa && estilos.textoActivo]}>
              {opcion.etiqueta}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
    overflow: 'hidden',
    marginBottom: espaciado.s,
  },
  opcion: { flex: 1, paddingVertical: espaciado.s, alignItems: 'center' },
  opcionActiva: { backgroundColor: colores.primario },
  texto: { fontSize: 13, color: colores.texto },
  textoActivo: { color: '#FFFFFF', fontWeight: '600' },
});
