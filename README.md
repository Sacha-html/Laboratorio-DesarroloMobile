# App móvil CO2 – Emisiones de dióxido de carbono por país

Aplicación móvil desarrollada con **React Native + Expo** bajo la metodología de Aprendizaje Basado en Proyectos (ABP). Consume datos reales de la **API del Banco Mundial** y los gestiona con **TanStack Query**.

## Descripción

La app muestra las emisiones de CO2 per cápita (toneladas por habitante) de cada país, con su último dato disponible, y permite entrar al detalle de un país para ver su evolución histórica año por año.

- **Indicador:** `EN.GHG.CO2.PC.CE.AR5` – emisiones de CO2 excluyendo uso del suelo (LULUCF), per cápita.
- **API:** `https://api.worldbank.org/v2/country/all/indicator/EN.GHG.CO2.PC.CE.AR5`
- Se usa `mrnev=1` (valor más reciente no vacío) para el listado y se descartan los agregados regionales (por ejemplo "Arab World") cruzando con el listado de países.
- Las banderas se obtienen de [flagcdn.com](https://flagcdn.com).

## Integrantes

- Germán Cochis
- Mariano Decalli
- Fernando Aparicio
- Sacha Del Barrio

## Features

### Implementadas

| # | Feature | Detalle |
|---|---|---|
| 1 | Listado de países | Tarjetas `PaisCard` con bandera, nombre, región y última emisión per cápita. |
| 2 | Detalle de país | Datos del país y serie histórica anual con barras (`BarraSerie`). |
| 3 | Consumo de la API con TanStack Query | Hooks `usePaisesEmisiones` y `useSerieHistorica`, con caché de un día y reintentos. |
| 4 | Estados de carga y error | `EstadoCargando` y `EstadoError` con botón "Reintentar". |
| 5 | Actualizar deslizando | Pull to refresh en el listado (`refetch`). |
| 6 | Búsqueda por nombre | `BarraBusqueda` filtra el listado sin distinguir mayúsculas ni tildes. |
| 7 | Filtro por región | `FiltroRegiones` con chips; se combina con la búsqueda. |
| 8 | Ordenar por emisión | `SelectorOrden`: A-Z, más emisión o menos emisión. |
| 9 | Favoritos | `BotonFavorito` en el listado y el detalle, filtro "Ver solo favoritos" y gestión de estado global con Zustand + persistencia en AsyncStorage. |
| 10 | Despliegue web en Vercel | `vercel.json` con el build de Expo para web: https://app-movil-co-2.vercel.app |

### Pendientes

| # | Feature | Detalle |
|---|---|---|
| 1 | Comparar países | Ver la serie de dos países juntos. |
| 2 | Gráfico de línea | Reemplazar las barras por un gráfico de evolución. |
| 3 | Navegación con pestañas | Inicio, favoritos y comparación. |
| 4 | Pruebas | Tests de servicio, hooks y componentes. |

## Tecnologías

- Expo y React Native (SDK 57)
- Expo Router (navegación basada en archivos)
- TypeScript
- TanStack Query (`@tanstack/react-query`)
- Zustand (`zustand`) para la gestión del estado global y persistencia
- expo-image
- AsyncStorage (`@react-native-async-storage/async-storage`) para guardar los favoritos

## Estructura del proyecto

```
src/
├── app/                  Rutas (Expo Router)
│   ├── _layout.tsx       Layout raíz y QueryClientProvider
│   ├── index.tsx         Listado de países
│   └── pais/[codigo].tsx Detalle de un país
├── components/           Componentes reutilizables (PaisCard, BarraSerie, BarraBusqueda, FiltroRegiones, SelectorOrden, BotonFavorito, EstadoConsulta)
├── hooks/                Hooks de TanStack Query (useEmisiones)
├── services/             Llamadas a la API del Banco Mundial
├── store/                Estado global con Zustand (useFavoritosStore)
├── types/                Tipos de dominio
├── constants/            Tema de colores y espaciado
└── utils/                Formato de números y URL de banderas
```

## Cómo ejecutar

```bash
npm install
npx expo start
```

Presionar `w` para abrir en el navegador, o escanear el QR con la app Expo Go.

## Flujo de trabajo y trazabilidad

La rama principal es `main` y está conectada con Vercel: cada vez que se integra un cambio en `main`, la app web se vuelve a publicar en https://app-movil-co-2.vercel.app.

**Flujo:**

1. Cada integrante crea su rama `feature/...` desde `main`.
2. Sube su rama y abre un Pull Request hacia `main`.
3. Se integra el Pull Request y Vercel publica los cambios automáticamente.

Los commits van en español y explican qué se hizo. Los merges conservan el historial.

**Convención de ramas:** `feature/<descripcion>` para funcionalidades, `fix/<descripcion>` para correcciones y `docs/<descripcion>` para documentación.

**Cómo colaborar:**

1. `git checkout main && git pull`
2. `git checkout -b feature/<descripcion>`
3. Commits en español, claros y acotados.
4. `git push -u origin feature/<descripcion>` y abrir un Pull Request hacia `main`.

**Historial de ramas:**

| Orden | Rama | Contenido |
|---|---|---|
| 1 | `main` | Commit inicial con la plantilla base de Expo y TypeScript. |
| 2 | `feature/enrutado-expo-router` | Expo Router, carpetas en `src`, tema y layout raíz. |
| 3 | `feature/tanstack-query-api-banco-mundial` | TanStack Query, servicio de la API, tipos y hooks. |
| 4 | `feature/listado-paises-pais-card` | Componente `PaisCard`, estados de consulta y listado. |
| 5 | `feature/detalle-pais-serie-historica` | Pantalla de detalle con `ScrollView` y `BarraSerie`. |
| 6 | `docs/readme-y-trazabilidad` | README inicial. |
| 7 | `feature/busqueda-y-filtro-por-region` | Búsqueda por nombre y filtro por región. |
| 8 | `feature/ordenar-por-emision` | Selector de orden: A-Z, más emisión, menos emisión. |
| 9 | `feature/favoritos` | Favoritos con persistencia en AsyncStorage y filtro de solo favoritos. |
| 10 | `feature/despliegue-vercel` | Configuración de Vercel (`vercel.json`) para publicar la versión web. |
| 11 | `docs/actualizar-readme-integrantes` | Integrantes del grupo y ajustes del README. |
| 12 | `docs/simplificar-flujo-a-main` | Flujo de trabajo simplificado: todo se integra directo en `main`. |
| 13 | `feature/migracion-zustand-favoritos` | Migración de React Context a Zustand con middleware persist, simplificando la arquitectura y eliminando código repetitivo. |

Para ver el historial completo con las ramas:

```bash
git log --graph --oneline --all
```

## Licencia

MIT
