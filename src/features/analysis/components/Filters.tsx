import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { IconChevronDown, IconFilter, IconSearch, IconMap } from "@tabler/icons-react";
import React, { useState } from "react";

interface FiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  searchQuery: string;
  eventType: string;
  timeRange: string;
  customDateRange: {
    start: string;
    end: string;
  };
  level: string;
  sources: string;
  newsType: string;
  mapFilters: {
    geographic: boolean;
    events: boolean;
    sources: boolean;
  };
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    eventType: "Todos",
    timeRange: "Un día",
    customDateRange: {
      start: "",
      end: "",
    },
    level: "Todos",
    sources: "",
    newsType: "Todos",
    mapFilters: {
      geographic: false,
      events: false,
      sources: false,
    },
  });

  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const textColor = useColorModeValue("gray.900", "white");
  const placeholderColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const iconColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const menuBg = useColorModeValue("#ffffff", "#0A0A0A");
  const menuItemHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleMapFilterChange = (key: keyof FilterState["mapFilters"], value: boolean) => {
    const newFilters = {
      ...filters,
      mapFilters: {
        ...filters.mapFilters,
        [key]: value,
      },
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleCustomDateChange = (key: "start" | "end", value: string) => {
    const newFilters = {
      ...filters,
      customDateRange: {
        ...filters.customDateRange,
        [key]: value,
      },
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const eventTypes = [
    "Todos",
    "Gobierno",
    "Economía",
    "Educación",
    "Salud",
    "Seguridad",
    "Cultura",
    "Tecnología",
    "Infraestructura",
    "Ecología",
  ];

  const timeRangeOptions = [
    "Un día",
    "Una semana",
    "Un mes",
    "Un año",
    "Personalizado",
  ];

  const levelOptions = ["Todos", "Nacional", "Estatal", "Municipal", "Local"];

  const newsTypes = ["Todos", "Artículo", "Twitter", "Facebook", "Web"];

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "searchQuery" || key === "sources") {
      return value !== "";
    }
    if (key === "mapFilters") {
      const mapFiltersValue = value as FilterState["mapFilters"];
      return Object.values(mapFiltersValue).some(v => v === true);
    }
    if (key === "customDateRange") {
      return false; // No contar customDateRange directamente
    }
    if (key === "timeRange") {
      return value !== "Un día";
    }
    return value !== "Todos";
  }).length;

  return (
    <Flex gap={2} align="center" wrap="wrap">
      {/* Búsqueda general */}
      <InputGroup size="sm" width="200px">
        <InputLeftElement pointerEvents="none">
          <IconSearch size={16} />
        </InputLeftElement>
        <Input
          placeholder="Buscar..."
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          bg={inputBg}
          border="1px solid"
          borderColor={borderColor}
          color={textColor}
          borderRadius="lg"
          _placeholder={{ color: placeholderColor }}
          _focus={{
            borderColor: "blue.400",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
          }}
        />
      </InputGroup>

      {/* Tipo de evento */}
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          variant="outline"
          borderColor={borderColor}
          color={textColor}
          borderRadius="lg"
          _hover={{ bg: menuItemHoverBg }}
        >
          {filters.eventType === "Todos" ? "Tipo de evento" : filters.eventType}
        </MenuButton>
        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={borderColor}
          maxHeight="200px"
          overflowY="auto"
        >
          {eventTypes.map((type) => (
            <MenuItem
              key={type}
              onClick={() => handleFilterChange("eventType", type)}
              bg={menuBg}
              color={textColor}
              _hover={{ bg: menuItemHoverBg }}
            >
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Rango de tiempo */}
      <Menu closeOnSelect={false}>
        {({ onClose }) => (
          <>
            <MenuButton
              as={Button}
              size="sm"
              rightIcon={<IconChevronDown size={16} />}
              variant="outline"
              borderColor={borderColor}
              color={textColor}
              borderRadius="lg"
              _hover={{ bg: menuItemHoverBg }}
            >
              {filters.timeRange}
            </MenuButton>
            <MenuList
              bg={menuBg}
              border="1px solid"
              borderColor={borderColor}
              p={filters.timeRange === "Personalizado" ? 4 : 0}
              minWidth={filters.timeRange === "Personalizado" ? "300px" : "auto"}
            >
              {timeRangeOptions.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => {
                    handleFilterChange("timeRange", option);
                    if (option !== "Personalizado") {
                      onClose();
                    }
                  }}
                  bg={menuBg}
                  color={textColor}
                  _hover={{ bg: menuItemHoverBg }}
                >
                  {option}
                </MenuItem>
              ))}

              {filters.timeRange === "Personalizado" && (
                <>
                  <Divider my={3} borderColor={borderColor} />
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" mb={2} color={textColor}>
                      Rango personalizado
                    </Text>
                    <Box mb={3}>
                      <Text fontSize="xs" mb={1} color={textColor}>
                        Fecha inicio
                      </Text>
                      <Input
                        type="date"
                        size="sm"
                        value={filters.customDateRange.start}
                        onChange={(e) => handleCustomDateChange("start", e.target.value)}
                        bg={inputBg}
                        border="1px solid"
                        borderColor={borderColor}
                        color={textColor}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                        }}
                      />
                    </Box>
                    <Box>
                      <Text fontSize="xs" mb={1} color={textColor}>
                        Fecha fin
                      </Text>
                      <Input
                        type="date"
                        size="sm"
                        value={filters.customDateRange.end}
                        onChange={(e) => handleCustomDateChange("end", e.target.value)}
                        bg={inputBg}
                        border="1px solid"
                        borderColor={borderColor}
                        color={textColor}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                        }}
                      />
                    </Box>
                  </Box>
                </>
              )}
            </MenuList>
          </>
        )}
      </Menu>

      {/* Nivel */}
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          variant="outline"
          borderColor={borderColor}
          color={textColor}
          borderRadius="lg"
          _hover={{ bg: menuItemHoverBg }}
        >
          {filters.level === "Todos" ? "Nivel" : filters.level}
        </MenuButton>
        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={borderColor}
        >
          {levelOptions.map((level) => (
            <MenuItem
              key={level}
              onClick={() => handleFilterChange("level", level)}
              bg={menuBg}
              color={textColor}
              _hover={{ bg: menuItemHoverBg }}
            >
              {level}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Tipo de noticia */}
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          variant="outline"
          borderColor={borderColor}
          color={textColor}
          borderRadius="lg"
          _hover={{ bg: menuItemHoverBg }}
        >
          {filters.newsType === "Todos" ? "Tipo de noticia" : filters.newsType}
        </MenuButton>
        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={borderColor}
        >
          {newsTypes.map((type) => (
            <MenuItem
              key={type}
              onClick={() => handleFilterChange("newsType", type)}
              bg={menuBg}
              color={textColor}
              _hover={{ bg: menuItemHoverBg }}
            >
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Mapa */}
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          size="sm"
          rightIcon={<IconChevronDown size={16} />}
          leftIcon={<IconMap size={16} />}
          variant="outline"
          borderColor={borderColor}
          color={textColor}
          borderRadius="lg"
          _hover={{ bg: menuItemHoverBg }}
        >
          Mapa
        </MenuButton>
        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={borderColor}
          p={4}
          minWidth="250px"
        >
          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel htmlFor="geographic-filter" mb="0" flex="1" fontSize="sm" color={textColor}>
              Filtro geográfico
            </FormLabel>
            <Switch
              id="geographic-filter"
              isChecked={filters.mapFilters.geographic}
              onChange={(e) => handleMapFilterChange("geographic", e.target.checked)}
              colorScheme="blue"
            />
          </FormControl>

          <Divider mb={3} borderColor={borderColor} />

          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel htmlFor="events-filter" mb="0" flex="1" fontSize="sm" color={textColor}>
              Eventos
            </FormLabel>
            <Switch
              id="events-filter"
              isChecked={filters.mapFilters.events}
              onChange={(e) => handleMapFilterChange("events", e.target.checked)}
              colorScheme="blue"
            />
          </FormControl>

          <Divider mb={3} borderColor={borderColor} />

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="sources-filter" mb="0" flex="1" fontSize="sm" color={textColor}>
              Fuentes
            </FormLabel>
            <Switch
              id="sources-filter"
              isChecked={filters.mapFilters.sources}
              onChange={(e) => handleMapFilterChange("sources", e.target.checked)}
              colorScheme="blue"
            />
          </FormControl>
        </MenuList>
      </Menu>

      {/* Botón Limpiar (solo si hay filtros activos) */}
      {activeFiltersCount > 0 && (
        <Button
          size="sm"
          variant="ghost"
          color={iconColor}
          borderRadius="lg"
          onClick={() => {
            const resetFilters: FilterState = {
              searchQuery: "",
              eventType: "Todos",
              timeRange: "Un día",
              customDateRange: {
                start: "",
                end: "",
              },
              level: "Todos",
              sources: "",
              newsType: "Todos",
              mapFilters: {
                geographic: false,
                events: false,
                sources: false,
              },
            };
            setFilters(resetFilters);
            onFiltersChange?.(resetFilters);
          }}
        >
          Limpiar ({activeFiltersCount})
        </Button>
      )}
    </Flex>
  );
};

export default Filters;
