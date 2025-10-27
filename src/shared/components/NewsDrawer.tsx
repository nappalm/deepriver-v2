import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
  Badge,
  Flex,
  Divider,
} from "@chakra-ui/react";
import React from "react";

interface NewsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsDrawer: React.FC<NewsDrawerProps> = ({ isOpen, onClose }) => {
  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const descColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const metaColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const badgeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const badgeBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");

  // Datos mockeados
  const mockData = {
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    title: "Nueva inversión en tecnología para el desarrollo digital",
    type: "Tecnología",
    date: "15 Enero, 14:30",
    author: "Carlos Mendoza",
    source: "El Universal",
    description:
      "El gobierno federal anunció un ambicioso plan de inversión en sectores tecnológicos que busca impulsar la transformación digital del país. La iniciativa incluye la modernización de infraestructura de telecomunicaciones, el desarrollo de centros de innovación tecnológica y programas de capacitación para profesionales del sector.",
    fullContent: `
      El secretario de Economía presentó los detalles del plan que contempla una inversión inicial de 5,000 millones de pesos para el primer año. Esta inversión se distribuirá en diferentes áreas estratégicas del desarrollo tecnológico nacional.

      Entre los principales ejes del programa se encuentran:

      1. Infraestructura Digital: Expansión de la red de fibra óptica a zonas rurales y periféricas, garantizando conectividad de alta velocidad para el 95% de la población.

      2. Centros de Innovación: Creación de 15 hubs tecnológicos en diferentes estados del país, equipados con tecnología de punta para startups y empresas emergentes.

      3. Capacitación Profesional: Becas y programas de certificación para 50,000 profesionales en áreas como inteligencia artificial, ciberseguridad y desarrollo de software.

      4. Apoyo a Startups: Fondo de capital semilla con 500 millones de pesos para proyectos innovadores de base tecnológica.

      El programa también incluye alianzas estratégicas con empresas tecnológicas internacionales y universidades de prestigio para facilitar la transferencia de conocimiento y mejores prácticas.

      Los expertos del sector han recibido favorablemente la noticia, destacando que esta inversión posiciona al país como un jugador relevante en el ecosistema tecnológico latinoamericano.

      Se espera que el impacto de estas acciones se refleje en la creación de más de 100,000 empleos directos e indirectos en los próximos tres años, además de atraer inversión extranjera por un monto estimado de 2,000 millones de dólares.

      La implementación del programa iniciará en el segundo trimestre del año, con la apertura de los primeros centros de innovación en Ciudad de México, Guadalajara y Monterrey.
    `,
    tags: ["Tecnología", "Innovación", "Inversión", "Gobierno", "Digital"],
    relatedNews: 24,
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay backdropFilter="blur(4px)" />
      <DrawerContent bg={bg} color={textColor}>
        <DrawerCloseButton
          top={4}
          right={4}
          size="lg"
          _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.200") }}
        />
        <DrawerBody p={0}>
          <VStack spacing={0} align="stretch">
            {/* Imagen principal */}
            <Box
              position="relative"
              width="100%"
              height="300px"
              overflow="hidden"
            >
              <Image
                src={mockData.image}
                alt={mockData.title}
                width="100%"
                height="100%"
                objectFit="cover"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient={useColorModeValue(
                  "linear(to-t, rgba(255,255,255,0.9), transparent)",
                  "linear(to-t, rgba(10,10,10,0.9), transparent)"
                )}
              />
            </Box>

            {/* Contenido */}
            <VStack spacing={4} align="stretch" p={6}>
              {/* Badges y metadata */}
              <Flex gap={2} flexWrap="wrap" align="center">
                <Badge
                  bg={badgeBg}
                  color={textColor}
                  fontSize="xs"
                  px={3}
                  py={1}
                  border="1px solid"
                  borderColor={badgeBorderColor}
                >
                  {mockData.type}
                </Badge>
                <Text fontSize="sm" color={metaColor}>
                  {mockData.date}
                </Text>
                <Text fontSize="sm" color={metaColor}>
                  •
                </Text>
                <Text fontSize="sm" color={metaColor}>
                  {mockData.author}
                </Text>
                <Text fontSize="sm" color={metaColor}>
                  •
                </Text>
                <Text fontSize="sm" color={metaColor}>
                  {mockData.source}
                </Text>
              </Flex>

              {/* Título */}
              <Heading size="lg" lineHeight="1.3" color={textColor}>
                {mockData.title}
              </Heading>

              <Divider borderColor={borderColor} />

              {/* Descripción breve */}
              <Text fontSize="md" color={descColor} fontWeight="medium">
                {mockData.description}
              </Text>

              <Divider borderColor={borderColor} />

              {/* Contenido completo */}
              <Box>
                <Text
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.8"
                  whiteSpace="pre-line"
                >
                  {mockData.fullContent}
                </Text>
              </Box>

              {/* Tags */}
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  mb={2}
                  color={textColor}
                >
                  Etiquetas
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {mockData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      bg={badgeBg}
                      color={metaColor}
                      fontSize="xs"
                      px={2}
                      py={1}
                      border="1px solid"
                      borderColor={badgeBorderColor}
                      cursor="pointer"
                      _hover={{
                        bg: useColorModeValue("gray.200", "whiteAlpha.300"),
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              {/* Noticias relacionadas */}
              <Box
                p={4}
                bg={useColorModeValue("gray.50", "whiteAlpha.100")}
                borderRadius="md"
                border="1px solid"
                borderColor={borderColor}
              >
                <Text fontSize="sm" color={metaColor}>
                  {mockData.relatedNews} noticias relacionadas con este tema
                </Text>
              </Box>
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NewsDrawer;
