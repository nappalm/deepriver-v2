import {
  Box,
  Card,
  CardBody,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";

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

  const mapboxToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

  const bg = useColorModeValue(
    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)",
  );
  const hoverBg = useColorModeValue(
    "linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)",
    "linear-gradient(135deg, #111 0%, #1f1f1f 100%)",
  );
  const textColor = useColorModeValue("gray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const markerBg = useColorModeValue("#ffffff", "#0A0A0A");
  const markerBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const markerHoverBg = useColorModeValue("#f9f9f9", "#111");
  const markerHoverBorderColor = useColorModeValue(
    "gray.400",
    "whiteAlpha.500",
  );
  const mapStyle = useColorModeValue(
    "mapbox://styles/mapbox/light-v11",
    "mapbox://styles/mapbox/dark-v11",
  );
  const controlsBg = useColorModeValue("#ffffff", "#0A0A0A");
  const controlsBorder = useColorModeValue(
    "rgba(0,0,0,0.1)",
    "rgba(255, 255, 255, 0.1)",
  );
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
        bgGradient={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        boxShadow="sm"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          bgGradient: hoverBg,
          boxShadow: "lg",
          borderColor: useColorModeValue("gray.300", "whiteAlpha.300"),
        }}
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
            <Text
              color={useColorModeValue("gray.600", "whiteAlpha.600")}
              fontSize="sm"
            >
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
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      borderRadius="2xl"
      height="100%"
      bgGradient={bg}
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      _hover={{
        bgGradient: hoverBg,
        boxShadow: "lg",
        borderColor: useColorModeValue("gray.300", "whiteAlpha.300"),
      }}
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
            border: `2px solid ${controlsBorder} !important`,
            borderRadius: "12px !important",
            boxShadow: useColorModeValue(
              "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06) !important",
              "0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3) !important",
            ),
            backdropFilter: "blur(10px) !important",
            overflow: "hidden !important",
          },
          ".mapboxgl-ctrl-group button": {
            background: `${controlsBg} !important`,
            border: "none !important",
            width: "36px !important",
            height: "36px !important",
            transition: "all 0.2s ease !important",
          },
          ".mapboxgl-ctrl-group button + button": {
            borderTop: `1px solid ${controlsBorder} !important`,
          },
          ".mapboxgl-ctrl-group button:hover": {
            background: `${controlsHoverBg} !important`,
            transform: "scale(1.05) !important",
          },
          ".mapboxgl-ctrl-icon": {
            filter: `${controlsIconFilter} !important`,
            opacity: "0.7 !important",
            transition: "opacity 0.2s ease !important",
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
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: useColorModeValue("#ffffff", "#0A0A0A"),
            borderRadius: "1.5rem",
          }}
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
              <Box
                position="relative"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <Box
                  bg={markerBg}
                  color={textColor}
                  borderRadius="lg"
                  width="40px"
                  height="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="sm"
                  border="2px solid"
                  borderColor={markerBorderColor}
                  position="relative"
                  backdropFilter="blur(20px)"
                  boxShadow={useColorModeValue(
                    "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
                    "0 4px 16px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)",
                  )}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                  _hover={{
                    bg: markerHoverBg,
                    borderColor: markerHoverBorderColor,
                    transform: "scale(1.1) translateY(-2px)",
                    boxShadow: useColorModeValue(
                      "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)",
                      "0 8px 24px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5)",
                    ),
                  }}
                >
                  {location.count || 1}
                </Box>
                <Box
                  position="absolute"
                  bottom="-8px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="0"
                  height="0"
                  borderLeft="8px solid transparent"
                  borderRight="8px solid transparent"
                  borderTop="8px solid"
                  borderTopColor={markerBg}
                  filter={useColorModeValue(
                    "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                    "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
                  )}
                />
                {/* Blur decorativo */}
                <Box
                  position="absolute"
                  top="-15px"
                  right="-15px"
                  width="50px"
                  height="50px"
                  bgGradient={useColorModeValue(
                    "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                  )}
                  borderRadius="full"
                  filter="blur(20px)"
                  zIndex={-1}
                />
              </Box>
            </Marker>
          ))}
        </MapGL>
      </Box>

      {/* Elementos decorativos */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 20% 30%, rgba(59, 130, 246, 0.15), transparent 50%), radial(circle at 80% 70%, rgba(96, 165, 250, 0.12), transparent 50%)"
        pointerEvents="none"
        zIndex={1}
      />

      <Box
        position="absolute"
        top="-30px"
        right="-30px"
        width="150px"
        height="150px"
        bgGradient={useColorModeValue(
          "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)",
        )}
        borderRadius="full"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-20px"
        left="-20px"
        width="100px"
        height="100px"
        bgGradient={useColorModeValue(
          "radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)",
          "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)",
        )}
        borderRadius="full"
        filter="blur(40px)"
        pointerEvents="none"
      />
    </Box>
  );
};

export default Map;
