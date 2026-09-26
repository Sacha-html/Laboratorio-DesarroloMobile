import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, espaciado } from '@/constants/tema';

export function EstadoCargando({ mensaje }: { mensaje: string }) {
  return (
    <View style={estilos.centrado}>
      <ActivityIndicator size="large" color={colores.primario} />
      <Text style={estilos.mensaje}>{mensaje}</Text>
    </View>
  );
}

interface EstadoErrorProps {
  mensaje: string;
  onReintentar: () => void;
}

export function EstadoError({ mensaje, onReintentar }: EstadoErrorProps) {
  return (
    <View style={estilos.centrado}>
      <Text style={estilos.error}>{mensaje}</Text>
      <Pressable style={estilos.boton} onPress={onReintentar}>
        <Text style={estilos.textoBoton}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: espaciado.l },
  mensaje: { marginTop: espaciado.m, color: colores.textoSecundario },
  error: { color: colores.error, textAlign: 'center', marginBottom: espaciado.m },
  boton: {
    backgroundColor: colores.primario,
    paddingHorizontal: espaciado.l,
    paddingVertical: espaciado.s + 4,
    borderRadius: 8,
  },
  textoBoton: { color: '#FFFFFF', fontWeight: '600' },
});
