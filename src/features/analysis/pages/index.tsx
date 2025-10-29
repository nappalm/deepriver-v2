import { Grid, Box, VStack, Heading, Stack, HStack, useDisclosure } from "@chakra-ui/react";
import Topics from "../components/Topics";
import News from "../components/News";
import Metrics from "../components/Metrics";
import Map from "../components/Map";
import Chart from "../components/Chart";
import Filters from "../components/Filters";
import NewsDrawer from "@/shared/components/NewsDrawer";

export default function Analysis() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Datos de ejemplo para Topics
  const topicsData = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop",
      title: "Reforma Energética",
      description:
        "Análisis de las últimas propuestas de reforma en el sector energético",
      newsCount: 24,
      type: "Gobierno",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
      title: "Desarrollo Urbano",
      description:
        "Proyectos de infraestructura y desarrollo urbano en la ciudad",
      newsCount: 15,
      type: "Infraestructura",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&h=200&fit=crop",
      title: "Política Educativa",
      description:
        "Nuevos programas de educación superior y becas para estudiantes",
      newsCount: 32,
      type: "Educación",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
      title: "Sistema de Salud",
      description:
        "Inversión en hospitales y mejoras en atención médica pública",
      newsCount: 28,
      type: "Salud",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
      title: "Medio Ambiente",
      description:
        "Estrategias para reducir la contaminación y proteger ecosistemas",
      newsCount: 19,
      type: "Ecología",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop",
      title: "Innovación Digital",
      description:
        "Transformación digital del gobierno y servicios públicos en línea",
      newsCount: 41,
      type: "Tecnología",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
      title: "Transporte Público",
      description: "Modernización del sistema de transporte metropolitano",
      newsCount: 22,
      type: "Infraestructura",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
      title: "Reforma Fiscal",
      description:
        "Cambios en el sistema tributario y nuevas políticas de recaudación",
      newsCount: 36,
      type: "Economía",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop",
      title: "Seguridad Ciudadana",
      description: "Estrategias para mejorar la seguridad en zonas urbanas",
      newsCount: 27,
      type: "Seguridad",
    },
    {
      id: "10",
      image:
        "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=200&fit=crop",
      title: "Cultura y Arte",
      description: "Apoyo a proyectos culturales y preservación del patrimonio",
      newsCount: 18,
      type: "Cultura",
    },
    {
      id: "11",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop",
      title: "Empleo y Trabajo",
      description: "Programas de generación de empleo y capacitación laboral",
      newsCount: 33,
      type: "Economía",
    },
    {
      id: "12",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
      title: "Telecomunicaciones",
      description:
        "Expansión de infraestructura de internet y conectividad rural",
      newsCount: 25,
      type: "Tecnología",
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",
      title: "Recursos Naturales",
      description: "Gestión sostenible de recursos hídricos y forestales",
      newsCount: 21,
      type: "Ecología",
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=200&fit=crop",
      title: "Vivienda Social",
      description: "Programas de construcción de viviendas accesibles",
      newsCount: 29,
      type: "Social",
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
      title: "Comercio Internacional",
      description: "Nuevos acuerdos comerciales y apertura de mercados",
      newsCount: 31,
      type: "Economía",
    },
    {
      id: "16",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=200&fit=crop",
      title: "Investigación Científica",
      description:
        "Inversión en centros de investigación y desarrollo tecnológico",
      newsCount: 16,
      type: "Ciencia",
    },
    {
      id: "17",
      image:
        "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=200&fit=crop",
      title: "Turismo Sostenible",
      description: "Promoción del turismo con enfoque en sustentabilidad",
      newsCount: 23,
      type: "Turismo",
    },
    {
      id: "18",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop",
      title: "Agricultura Moderna",
      description: "Tecnificación del campo y apoyo a pequeños productores",
      newsCount: 26,
      type: "Agricultura",
    },
    {
      id: "19",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=200&fit=crop",
      title: "Derechos Humanos",
      description: "Políticas de inclusión y protección de grupos vulnerables",
      newsCount: 20,
      type: "Social",
    },
    {
      id: "20",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      title: "Administración Pública",
      description: "Modernización de procesos administrativos gubernamentales",
      newsCount: 17,
      type: "Gobierno",
    },
  ];

  // Datos de ejemplo para News
  const newsData = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      title: "Nueva inversión en tecnología",
      description:
        "Gobierno anuncia plan de inversión en sectores tecnológicos",
      newsCount: 8,
      type: "Tecnología",
      date: "15 Enero, 14:30",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
      title: "Presupuesto 2025",
      description:
        "Detalles del presupuesto asignado para el próximo año fiscal",
      newsCount: 12,
      type: "Economía",
      date: "14 Enero, 11:15",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop",
      title: "Reforma educativa aprobada",
      description: "Congreso aprueba cambios en el sistema educativo nacional",
      newsCount: 15,
      type: "Educación",
      date: "13 Enero, 09:45",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=200&fit=crop",
      title: "Nuevo hospital inaugurado",
      description: "Abre sus puertas hospital de especialidades en zona norte",
      newsCount: 6,
      type: "Salud",
      date: "12 Enero, 16:20",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop",
      title: "Energías renovables en auge",
      description: "Aumenta inversión en paneles solares y eólicos",
      newsCount: 10,
      type: "Ecología",
      date: "11 Enero, 13:00",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=200&fit=crop",
      title: "Metro amplía cobertura",
      description: "Nuevas estaciones conectarán zonas periféricas",
      newsCount: 9,
      type: "Infraestructura",
      date: "10 Enero, 10:30",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop",
      title: "Inflación baja 0.3%",
      description: "Datos económicos muestran tendencia positiva",
      newsCount: 14,
      type: "Economía",
      date: "9 Enero, 15:45",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=200&fit=crop",
      title: "Seguridad reforzada",
      description: "Despliegan nueva estrategia de vigilancia urbana",
      newsCount: 11,
      type: "Seguridad",
      date: "8 Enero, 08:15",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=200&fit=crop",
      title: "Festival cultural anunciado",
      description: "Evento reunirá artistas nacionales e internacionales",
      newsCount: 5,
      type: "Cultura",
      date: "7 Enero, 12:00",
    },
    {
      id: "10",
      image:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=200&fit=crop",
      title: "Programa de empleo joven",
      description: "Lanzan iniciativa para capacitar a jóvenes",
      newsCount: 13,
      type: "Social",
      date: "6 Enero, 17:30",
    },
    {
      id: "11",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop",
      title: "5G llega a más ciudades",
      description: "Expansión de red de quinta generación continúa",
      newsCount: 7,
      type: "Tecnología",
      date: "5 Enero, 14:00",
    },
    {
      id: "12",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
      title: "Reforestación masiva",
      description: "Plantan 100 mil árboles en reserva ecológica",
      newsCount: 8,
      type: "Ecología",
      date: "4 Enero, 11:45",
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop",
      title: "Créditos para vivienda",
      description: "Bancos ofrecen tasas preferenciales para hogares",
      newsCount: 10,
      type: "Social",
      date: "3 Enero, 09:30",
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=200&fit=crop",
      title: "Exportaciones crecen 15%",
      description: "Sector manufacturero reporta incremento",
      newsCount: 12,
      type: "Economía",
      date: "2 Enero, 16:15",
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
      title: "Centro de investigación abre",
      description: "Nuevo laboratorio de biotecnología inicia operaciones",
      newsCount: 6,
      type: "Ciencia",
      date: "1 Enero, 13:20",
    },
    {
      id: "16",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
      title: "Turismo aumenta 20%",
      description: "Destinos nacionales reciben más visitantes",
      newsCount: 9,
      type: "Turismo",
      date: "31 Diciembre, 10:00",
    },
    {
      id: "17",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop",
      title: "Subsidios para agricultores",
      description: "Apoyo económico llega a pequeños productores",
      newsCount: 11,
      type: "Agricultura",
      date: "30 Diciembre, 15:00",
    },
    {
      id: "18",
      image:
        "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=200&fit=crop",
      title: "Programa de inclusión",
      description: "Implementan acciones para grupos vulnerables",
      newsCount: 7,
      type: "Social",
      date: "29 Diciembre, 12:45",
    },
    {
      id: "19",
      image:
        "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=400&h=200&fit=crop",
      title: "Trámites ahora digitales",
      description: "Gobierno digitaliza 50 servicios públicos",
      newsCount: 14,
      type: "Gobierno",
      date: "28 Diciembre, 08:30",
    },
    {
      id: "20",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&h=200&fit=crop",
      title: "Inversión extranjera sube",
      description: "País atrae capitales por estabilidad económica",
      newsCount: 13,
      type: "Economía",
      date: "27 Diciembre, 11:00",
    },
  ];

  // Datos de ejemplo para Metrics
  const metricsData = {
    documents: 1250,
    likes: 3480,
    authors: 45,
    valuationMXN: 15000000,
  };

  // Datos de ejemplo para Map - Distribuidos por México
  const mapLocations = [
    {
      id: "1",
      latitude: 19.4326,
      longitude: -99.1332,
      title: "Ciudad de México",
      count: 45,
    },
    {
      id: "2",
      latitude: 25.6866,
      longitude: -100.3161,
      title: "Monterrey",
      count: 38,
    },
    {
      id: "3",
      latitude: 20.6597,
      longitude: -103.3496,
      title: "Guadalajara",
      count: 42,
    },
    {
      id: "4",
      latitude: 21.1619,
      longitude: -86.8515,
      title: "Cancún",
      count: 28,
    },
    {
      id: "5",
      latitude: 32.6245,
      longitude: -115.4523,
      title: "Tijuana",
      count: 35,
    },
    {
      id: "6",
      latitude: 19.0414,
      longitude: -98.2063,
      title: "Puebla",
      count: 31,
    },
    {
      id: "7",
      latitude: 20.9674,
      longitude: -89.5926,
      title: "Mérida",
      count: 24,
    },
    {
      id: "8",
      latitude: 31.6904,
      longitude: -106.4245,
      title: "Ciudad Juárez",
      count: 22,
    },
    {
      id: "9",
      latitude: 25.5428,
      longitude: -103.4068,
      title: "Torreón",
      count: 19,
    },
    {
      id: "10",
      latitude: 17.0732,
      longitude: -96.7266,
      title: "Oaxaca",
      count: 26,
    },
    {
      id: "11",
      latitude: 22.1565,
      longitude: -100.9855,
      title: "San Luis Potosí",
      count: 20,
    },
    {
      id: "12",
      latitude: 16.7569,
      longitude: -93.1292,
      title: "Tuxtla Gutiérrez",
      count: 17,
    },
  ];

  // Datos de ejemplo para Chart
  const chartData = [
    { name: "00h", value: 12 },
    { name: "03h", value: 8 },
    { name: "06h", value: 15 },
    { name: "09h", value: 45 },
    { name: "12h", value: 62 },
    { name: "15h", value: 58 },
    { name: "18h", value: 48 },
    { name: "21h", value: 35 },
  ];

  const handleFiltersChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Aquí puedes implementar la lógica de filtrado
  };

  return (
    <Box overflow="hidden">
      <HStack gap={5} mb={5}>
        <Heading variant="titleUnderline">Analysis</Heading>
        <Filters onFiltersChange={handleFiltersChange} />
      </HStack>
      <Grid
        templateColumns={{ base: "1fr", lg: "1.5fr 1.2fr 1.4fr" }}
        gap={6}
        height="calc(100vh - 169px)"
      >
        <Box overflowY="auto" overflowX="hidden" pr={2} height="100%">
          <Topics topics={topicsData} onTopicClick={onOpen} />
        </Box>
        <Box overflowY="auto" height="100%" pr={2}>
          <News news={newsData} onNewsClick={onOpen} />
        </Box>
        <VStack overflowY="auto" height="100%" spacing={6} align="stretch">
          <Box height="400px" width="100%">
            <Map locations={mapLocations} />
          </Box>
          <Box height="170px" width="100%">
            <Chart
              data={chartData}
              title="Tendencias temporales"
              color="#3b82f6"
            />
          </Box>
          <Metrics data={metricsData} />
        </VStack>
      </Grid>

      <NewsDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
