import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BarraSerie } from '@/components/BarraSerie';
import { BotonFavorito } from '@/components/BotonFavorito';
import { EstadoCargando, EstadoError } from '@/components/EstadoConsulta';
import { colores, espaciado } from '@/constants/tema';
import { useFavoritosStore } from '@/store/useFavoritosStore';
import { usePaisesEmisiones, useSerieHistorica } from '@/hooks/useEmisiones';
import { formatearToneladas, urlBandera } from '@/utils/formato';

export default function DetallePais() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const paises = usePaisesEmisiones();
  const serie = useSerieHistorica(codigo);
  const { favoritos, esFavorito, alternarFavorito } = useFavoritosStore();

  const pais = paises.data?.find((item) => item.codigoIso3 === codigo);

  if (serie.isPending || paises.isPending) {
    return <EstadoCargando mensaje="Cargando serie histórica..." />;
  }

  if (serie.isError) {
    return <EstadoError mensaje={serie.error.message} onReintentar={serie.refetch} />;
  }

  const maximo = Math.max(...serie.data.map((punto) => punto.valor), 0);
  const puntos = [...serie.data].reverse();

  return (
    <ScrollView contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: pais?.nombre ?? codigo }} />
      {pais && (
        <View style={estilos.cabecera}>
          <Image
            source={{ uri: urlBandera(pais.codigoIso2, 320) }}
            style={estilos.bandera}
            contentFit="cover"
            accessibilityLabel={`Bandera de ${pais.nombre}`}
          />
          <View style={estilos.filaNombre}>
            <Text style={estilos.nombre}>{pais.nombre}</Text>
            <BotonFavorito
              activo={esFavorito(pais.codigoIso3)}
              onPress={() => alternarFavorito(pais.codigoIso3)}
            />
          </View>
          <Text style={estilos.dato}>Región: {pais.region}</Text>
          {pais.capital !== '' && <Text style={estilos.dato}>Capital: {pais.capital}</Text>}
          <Text style={estilos.dato}>Nivel de ingreso: {pais.nivelIngreso}</Text>
          <Text style={estilos.destacado}>{formatearToneladas(pais.valor)} per cápita en {pais.anio}</Text>
        </View>
      )}

      <Text style={estilos.seccion}>Serie histórica ({puntos.length} años)</Text>
      {puntos.map((punto) => (
        <BarraSerie key={punto.anio} anio={punto.anio} valor={punto.valor} maximo={maximo} />
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: espaciado.m },
  cabecera: {
    backgroundColor: colores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.m,
    marginBottom: espaciado.l,
  },
  bandera: { width: 120, height: 80, borderRadius: 6, marginBottom: espaciado.m, backgroundColor: colores.borde },
  filaNombre: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: espaciado.s },
  nombre: { fontSize: 24, fontWeight: '700', color: colores.texto },
  dato: { color: colores.textoSecundario, marginBottom: espaciado.xs },
  destacado: { marginTop: espaciado.s, fontSize: 18, fontWeight: '700', color: colores.primario },
  seccion: { fontSize: 18, fontWeight: '700', color: colores.texto, marginBottom: espaciado.m },
});
