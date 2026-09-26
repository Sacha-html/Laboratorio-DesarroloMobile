import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EstadoCargando, EstadoError } from '@/components/EstadoConsulta';
import { PaisCard } from '@/components/PaisCard';
import { colores, espaciado } from '@/constants/tema';
import { usePaisesEmisiones } from '@/hooks/useEmisiones';

export default function Inicio() {
  const { data, isPending, isError, error, refetch, isRefetching } =
    usePaisesEmisiones();

  if (isPending) {
    return <EstadoCargando mensaje="Cargando datos del Banco Mundial..." />;
  }

  if (isError) {
    return <EstadoError mensaje={error.message} onReintentar={refetch} />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(pais) => pais.codigoIso3}
      renderItem={({ item }) => <PaisCard pais={item} />}
      contentContainerStyle={estilos.lista}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListHeaderComponent={
        <View style={estilos.encabezado}>
          <Text style={estilos.titulo}>Emisiones de CO2 per cápita</Text>
          <Text style={estilos.subtitulo}>
            {data.length} países · último dato disponible · Banco Mundial
          </Text>
        </View>
      }
    />
  );
}

const estilos = StyleSheet.create({
  lista: { padding: espaciado.m },
  encabezado: { marginBottom: espaciado.m },
  titulo: { fontSize: 22, fontWeight: '700', color: colores.texto },
  subtitulo: { marginTop: espaciado.xs, color: colores.textoSecundario },
});
