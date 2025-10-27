import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapLocation {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  count?: number;
}

interface MapProps {
  locations?: MapLocation[];
  center?: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  locations = [],
  center = { latitude: 19.4326, longitude: -99.1332 }, // Ciudad de México por defecto
  zoom = 10,
}) => {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: zoom * 0.2, // Aplicar zoom del 20%
  });
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null,
  );
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const mapboxToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

  const totalCount = locations.reduce((acc, loc) => acc + (loc.count || 0), 0);

  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const markerBg = useColorModeValue("#ffffff", "#0A0A0A");
  const markerBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const markerHoverBg = useColorModeValue("#f9f9f9", "#111");
  const markerHoverBorderColor = useColorModeValue("gray.400", "whiteAlpha.500");
  const mapStyle = useColorModeValue("mapbox://styles/mapbox/light-v11", "mapbox://styles/mapbox/dark-v11");
  const controlsBg = useColorModeValue("#ffffff", "#0A0A0A");
  const controlsBorder = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255, 255, 255, 0.1)");
  const controlsHoverBg = useColorModeValue("#f5f5f5", "#111");
  const controlsIconFilter = useColorModeValue("invert(0)", "invert(1)");

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      // Calcular bounds para ajustar el mapa a todas las ubicaciones
      const bounds = locations.reduce(
        (acc, location) => {
          return {
            minLng: Math.min(acc.minLng, location.longitude),
            maxLng: Math.max(acc.maxLng, location.longitude),
            minLat: Math.min(acc.minLat, location.latitude),
            maxLat: Math.max(acc.maxLat, location.latitude),
          };
        },
        {
          minLng: locations[0].longitude,
          maxLng: locations[0].longitude,
          minLat: locations[0].latitude,
          maxLat: locations[0].latitude,
        },
      );

      // Centrar el mapa en las ubicaciones
      const centerLng = (bounds.minLng + bounds.maxLng) / 2;
      const centerLat = (bounds.minLat + bounds.maxLat) / 2;

      setViewState({
        longitude: centerLng,
        latitude: centerLat,
        zoom: 11 * 0.2, // Aplicar zoom del 20%
      });
    }
  }, [locations]);

  if (!mapboxToken) {
    return (
      <Card
        height="100%"
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
      >
        <CardBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <VStack spacing={2}>
            <Text color={textColor} fontWeight="medium">
              Mapbox token no configurado
            </Text>
            <Text color={useColorModeValue("gray.600", "whiteAlpha.600")} fontSize="sm">
              Configura VITE_APP_MAPBOX_ACCESS_TOKEN
            </Text>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Box
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      borderRadius="md"
      height="100%"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
    >
      <Box
        height="100%"
        width="100%"
        position="relative"
        sx={{
          ".mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib": {
            display: "none !important",
          },
          ".mapboxgl-ctrl-group": {
            background: `${controlsBg} !important`,
            border: `1px solid ${controlsBorder} !important`,
            borderRadius: "6px !important",
            boxShadow: "none !important",
          },
          ".mapboxgl-ctrl-group button": {
            background: `${controlsBg} !important`,
            border: "none !important",
            width: "32px !important",
            height: "32px !important",
          },
          ".mapboxgl-ctrl-group button + button": {
            borderTop: `1px solid ${controlsBorder} !important`,
          },
          ".mapboxgl-ctrl-group button:hover": {
            background: `${controlsHoverBg} !important`,
          },
          ".mapboxgl-ctrl-icon": {
            filter: `${controlsIconFilter} !important`,
            opacity: "0.7 !important",
          },
          ".mapboxgl-ctrl-group button:hover .mapboxgl-ctrl-icon": {
            opacity: "1 !important",
          },
        }}
      >
        <MapGL
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapboxAccessToken={mapboxToken}
          mapStyle={mapStyle}
          style={{ width: "100%", height: "100%", backgroundColor: bg }}
          scrollZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
          onLoad={() => {
            if (mapRef.current) {
              const map = mapRef.current.getMap();
              map.setPaintProperty("water", "fill-color", bg);
            }
          }}
        >
          <Box position="absolute" top={3} right={3} zIndex={1}>
            <NavigationControl showCompass={false} />
          </Box>

          {locations.map((location) => (
            <Marker
              key={location.id}
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
            >
              <Box position="relative" transition="all 0.3s ease">
                <Box
                  bg={markerBg}
                  color={textColor}
                  borderRadius="md"
                  width="36px"
                  height="36px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="xs"
                  border="1px solid"
                  borderColor={markerBorderColor}
                  position="relative"
                  backdropFilter="blur(10px)"
                  boxShadow={useColorModeValue("0 4px 12px rgba(0, 0, 0, 0.1)", "0 4px 12px rgba(0, 0, 0, 0.5)")}
                  _hover={{
                    bg: markerHoverBg,
                    borderColor: markerHoverBorderColor,
                  }}
                >
                  {location.count || 1}
                </Box>
                <Box
                  position="absolute"
                  bottom="-6px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="0"
                  height="0"
                  borderLeft="6px solid transparent"
                  borderRight="6px solid transparent"
                  borderTop="6px solid"
                  borderTopColor={markerBg}
                  filter={useColorModeValue("drop-shadow(0 2px 4px rgba(0,0,0,0.1))", "drop-shadow(0 2px 4px rgba(0,0,0,0.5))")}
                />
                {/* Blur decorativo */}
                <Box
                  position="absolute"
                  top="-10px"
                  right="-10px"
                  width="40px"
                  height="40px"
                  bg="whiteAlpha.100"
                  borderRadius="full"
                  filter="blur(15px)"
                  zIndex={-1}
                />
              </Box>
            </Marker>
          ))}
        </MapGL>
      </Box>

      {/* Bento overlay effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 20% 30%, rgba(139, 92, 246, 0.2), transparent 40%), radial(circle at 80% 70%, rgba(59, 130, 246, 0.15), transparent 40%)"
        pointerEvents="none"
        zIndex={1}
      />

      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        width="120px"
        height="120px"
        bg="whiteAlpha.100"
        borderRadius="full"
        filter="blur(40px)"
      />
    </Box>
  );
};

export default Map;
