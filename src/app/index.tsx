import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { BarraBusqueda } from '@/components/BarraBusqueda';
import { EstadoCargando, EstadoError } from '@/components/EstadoConsulta';
import { FiltroRegiones } from '@/components/FiltroRegiones';
import { PaisCard } from '@/components/PaisCard';
import { type Orden, SelectorOrden } from '@/components/SelectorOrden';
import { colores, espaciado } from '@/constants/tema';
import { useFavoritosStore } from '@/store/useFavoritosStore';
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
  const [orden, setOrden] = useState<Orden>('nombre');
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const { favoritos, esFavorito, alternarFavorito } = useFavoritosStore();
  const { data, isPending, isError, error, refetch, isRefetching } =
    usePaisesEmisiones();

  const regiones = useMemo(
    () => [...new Set((data ?? []).map((pais) => pais.region))].sort(),
    [data],
  );

  const paisesFiltrados = useMemo(() => {
    const termino = normalizar(busqueda);
    const filtrados = (data ?? []).filter(
      (pais) =>
        (!soloFavoritos || esFavorito(pais.codigoIso3)) &&
        (region === null || pais.region === region) &&
        normalizar(pais.nombre).includes(termino),
    );
    if (orden === 'mayor') return filtrados.sort((a, b) => b.valor - a.valor);
    if (orden === 'menor') return filtrados.sort((a, b) => a.valor - b.valor);
    return filtrados;
  }, [data, busqueda, region, orden, soloFavoritos, favoritos, esFavorito]);

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
        <SelectorOrden orden={orden} onCambiar={setOrden} />
        <Pressable
          onPress={() => setSoloFavoritos((actual) => !actual)}
          style={[estilos.botonFavoritos, soloFavoritos && estilos.botonFavoritosActivo]}
        >
          <Text style={[estilos.textoFavoritos, soloFavoritos && estilos.textoFavoritosActivo]}>
            {soloFavoritos ? '★ Mostrando solo favoritos' : '☆ Ver solo favoritos'}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={paisesFiltrados}
        keyExtractor={(pais) => pais.codigoIso3}
        renderItem={({ item }) => (
          <PaisCard
            pais={item}
            esFavorito={esFavorito(item.codigoIso3)}
            onAlternarFavorito={() => alternarFavorito(item.codigoIso3)}
            onPress={() => router.push(`/pais/${item.codigoIso3}`)}
          />
        )}
        contentContainerStyle={estilos.lista}
        refreshing={isRefetching}
        onRefresh={refetch}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={estilos.vacio}>
            {soloFavoritos
              ? 'Todavía no marcaste países favoritos.'
              : 'No se encontraron países con ese criterio.'}
          </Text>
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
  botonFavoritos: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
    borderRadius: 16,
    paddingHorizontal: espaciado.m,
    paddingVertical: espaciado.s,
    marginBottom: espaciado.s,
  },
  botonFavoritosActivo: { backgroundColor: '#FFF3CC', borderColor: '#E0A100' },
  textoFavoritos: { fontSize: 13, color: colores.texto },
  textoFavoritosActivo: { fontWeight: '600' },
  lista: { padding: espaciado.m },
  vacio: { textAlign: 'center', color: colores.textoSecundario, marginTop: espaciado.l },
});
