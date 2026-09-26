import { StyleSheet, Text, View } from 'react-native';

import { colores, espaciado } from '@/constants/tema';
import { formatearToneladas } from '@/utils/formato';

interface BarraSerieProps {
  anio: number;
  valor: number;
  maximo: number;
}

export function BarraSerie({ anio, valor, maximo }: BarraSerieProps) {
  const proporcion = maximo > 0 ? Math.max(valor / maximo, 0.01) : 0.01;
  return (
    <View style={estilos.fila}>
      <Text style={estilos.anio}>{anio}</Text>
      <View style={estilos.pista}>
        <View style={[estilos.barra, { width: `${proporcion * 100}%` }]} />
      </View>
      <Text style={estilos.valor}>{formatearToneladas(valor)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: 'row', alignItems: 'center', gap: espaciado.s, marginBottom: espaciado.xs + 2 },
  anio: { width: 40, fontSize: 12, color: colores.textoSecundario },
  pista: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colores.primarioSuave },
  barra: { height: 10, borderRadius: 5, backgroundColor: colores.primario },
  valor: { width: 76, textAlign: 'right', fontSize: 12, color: colores.texto },
});
