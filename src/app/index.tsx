import { StyleSheet, Text, View } from 'react-native';

import { colores, espaciado } from '@/constants/tema';

export default function Inicio() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Emisiones de CO2 per cápita</Text>
      <Text style={estilos.subtitulo}>Datos del Banco Mundial</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: espaciado.l, justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: '700', color: colores.texto },
  subtitulo: { marginTop: espaciado.s, color: colores.textoSecundario },
});
