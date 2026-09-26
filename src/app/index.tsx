import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { BarraBusqueda } from '@/components/BarraBusqueda';
import { EstadoCargando, EstadoError } from '@/components/EstadoConsulta';
import { FiltroRegiones } from '@/components/FiltroRegiones';
import { PaisCard } from '@/components/PaisCard';
import { colores, espaciado } from '@/constants/tema';
import { usePaisesEmisiones } from '@/hooks/useEmisiones';

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export default function Inicio() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const [region, setRegion] = useState<string | null>(null);
  const { data, isPending, isError, error, refetch, isRefetching } =
    usePaisesEmisiones();

  const regiones = useMemo(
    () => [...new Set((data ?? []).map((pais) => pais.region))].sort(),
    [data],
  );

  const paisesFiltrados = useMemo(() => {
    const termino = normalizar(busqueda);
    return (data ?? []).filter(
      (pais) =>
        (region === null || pais.region === region) &&
        normalizar(pais.nombre).includes(termino),
    );
  }, [data, busqueda, region]);

  if (isPending) {
    return <EstadoCargando mensaje="Cargando datos del Banco Mundial..." />;
  }

  if (isError) {
    return <EstadoError mensaje={error.message} onReintentar={refetch} />;
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Emisiones de CO2 per cápita</Text>
        <Text style={estilos.subtitulo}>
          {paisesFiltrados.length} de {data.length} países · último dato disponible
        </Text>
        <BarraBusqueda valor={busqueda} onCambiar={setBusqueda} />
        <FiltroRegiones
          regiones={regiones}
          seleccionada={region}
          onSeleccionar={setRegion}
        />
      </View>
      <FlatList
        data={paisesFiltrados}
        keyExtractor={(pais) => pais.codigoIso3}
        renderItem={({ item }) => (
          <PaisCard
            pais={item}
            onPress={() => router.push(`/pais/${item.codigoIso3}`)}
          />
        )}
        contentContainerStyle={estilos.lista}
        refreshing={isRefetching}
        onRefresh={refetch}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={estilos.vacio}>No se encontraron países con ese criterio.</Text>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1 },
  encabezado: { padding: espaciado.m, paddingBottom: 0 },
  titulo: { fontSize: 22, fontWeight: '700', color: colores.texto },
  subtitulo: { marginTop: espaciado.xs, marginBottom: espaciado.m, color: colores.textoSecundario },
  lista: { padding: espaciado.m },
  vacio: { textAlign: 'center', color: colores.textoSecundario, marginTop: espaciado.l },
});
