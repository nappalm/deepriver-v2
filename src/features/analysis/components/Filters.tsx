import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconChevronDown,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react";
import React, { useState } from "react";

interface FiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  searchQuery: string;
  eventType: string;
  sortBy: string;
  level: string;
  sources: string;
  newsType: string;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    eventType: "Todos",
    sortBy: "Más recientes",
    level: "Todos",
    sources: "",
    newsType: "Todos",
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

  const sortOptions = [
    "Más recientes",
    "Más antiguos",
    "Más relevantes",
    "Alfabético A-Z",
    "Alfabético Z-A",
  ];

  const levelOptions = [
    "Todos",
    "Nacional",
    "Estatal",
    "Municipal",
    "Local",
  ];

  const newsTypes = [
    "Todos",
    "Artículo",
    "Twitter",
    "Facebook",
    "Web",
  ];

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      width="100%"
    >
      <Flex gap={3} align="center" flexWrap="wrap">
        {/* Búsqueda general */}
        <Box flex="1" minWidth="200px">
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none">
              <IconSearch size={16} color={iconColor} />
            </InputLeftElement>
            <Input
              placeholder="Buscar..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange("searchQuery", e.target.value)
              }
              bg={inputBg}
              border="1px solid"
              borderColor={borderColor}
              color={textColor}
              _placeholder={{ color: placeholderColor }}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
              }}
            />
          </InputGroup>
        </Box>
        {/* Tipo de evento */}
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            rightIcon={<IconChevronDown size={16} />}
            variant="outline"
            borderColor={borderColor}
            color={textColor}
            _hover={{ bg: menuItemHoverBg }}
            _active={{ bg: menuItemHoverBg }}
            minWidth="140px"
          >
            {filters.eventType}
          </MenuButton>
          <MenuList
            bg={menuBg}
            border="1px solid"
            borderColor={borderColor}
            maxHeight="250px"
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

        {/* Ordenar por */}
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            rightIcon={<IconChevronDown size={16} />}
            variant="outline"
            borderColor={borderColor}
            color={textColor}
            _hover={{ bg: menuItemHoverBg }}
            _active={{ bg: menuItemHoverBg }}
            minWidth="140px"
          >
            {filters.sortBy}
          </MenuButton>
          <MenuList bg={menuBg} border="1px solid" borderColor={borderColor}>
            {sortOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleFilterChange("sortBy", option)}
                bg={menuBg}
                color={textColor}
                _hover={{ bg: menuItemHoverBg }}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
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
            _hover={{ bg: menuItemHoverBg }}
            _active={{ bg: menuItemHoverBg }}
            minWidth="120px"
          >
            {filters.level}
          </MenuButton>
          <MenuList bg={menuBg} border="1px solid" borderColor={borderColor}>
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
            _hover={{ bg: menuItemHoverBg }}
            _active={{ bg: menuItemHoverBg }}
            minWidth="120px"
          >
            {filters.newsType}
          </MenuButton>
          <MenuList bg={menuBg} border="1px solid" borderColor={borderColor}>
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

        {/* Fuentes */}
        <Box minWidth="150px">
          <Input
            placeholder="Filtrar por fuente..."
            value={filters.sources}
            onChange={(e) => handleFilterChange("sources", e.target.value)}
            size="sm"
            bg={inputBg}
            border="1px solid"
            borderColor={borderColor}
            color={textColor}
            _placeholder={{ color: placeholderColor }}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
            }}
          />
        </Box>

        {/* Botón Limpiar */}
        <Button
          size="sm"
          variant="ghost"
          color={iconColor}
          leftIcon={<IconFilter size={16} />}
          onClick={() => {
            const resetFilters: FilterState = {
              searchQuery: "",
              eventType: "Todos",
              sortBy: "Más recientes",
              level: "Todos",
              sources: "",
              newsType: "Todos",
            };
            setFilters(resetFilters);
            onFiltersChange?.(resetFilters);
          }}
        >
          Limpiar
        </Button>
      </Flex>
    </Box>
  );
};

export default Filters;
