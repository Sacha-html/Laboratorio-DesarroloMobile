import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BotonFavorito } from '@/components/BotonFavorito';
import { colores, espaciado } from '@/constants/tema';
import type { PaisEmision } from '@/types/emisiones';
import { formatearToneladas, urlBandera } from '@/utils/formato';

interface PaisCardProps {
  pais: PaisEmision;
  esFavorito: boolean;
  onAlternarFavorito: () => void;
  onPress?: () => void;
}

export function PaisCard({ pais, esFavorito, onAlternarFavorito, onPress }: PaisCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [estilos.tarjeta, pressed && estilos.presionada]}
    >
      <Image
        source={{ uri: urlBandera(pais.codigoIso2) }}
        style={estilos.bandera}
        contentFit="cover"
        accessibilityLabel={`Bandera de ${pais.nombre}`}
      />
      <View style={estilos.info}>
        <Text style={estilos.nombre} numberOfLines={1}>
          {pais.nombre}
        </Text>
        <Text style={estilos.region} numberOfLines={1}>
          {pais.region}
        </Text>
      </View>
      <View style={estilos.valorContenedor}>
        <Text style={estilos.valor}>{formatearToneladas(pais.valor)}</Text>
        <Text style={estilos.anio}>per cápita · {pais.anio}</Text>
      </View>
      <BotonFavorito activo={esFavorito} onPress={onAlternarFavorito} />
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.m,
    marginBottom: espaciado.s,
    gap: espaciado.m,
  },
  presionada: { opacity: 0.7 },
  bandera: { width: 48, height: 32, borderRadius: 4, backgroundColor: colores.borde },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: '600', color: colores.texto },
  region: { marginTop: 2, fontSize: 13, color: colores.textoSecundario },
  valorContenedor: { alignItems: 'flex-end' },
  valor: { fontSize: 16, fontWeight: '700', color: colores.primario },
  anio: { marginTop: 2, fontSize: 11, color: colores.textoSecundario },
});
