import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Portal,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconBookmarkFilled, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface FilterToken {
  key: string;
  label: string;
  value: string;
}

interface FilterOption {
  key: string;
  label: string;
  description: string;
  values?: string[];
  subValues?: Record<string, string[]>; // Para subtipos basados en tipo
  disabled?: boolean;
}

interface FilterInLineProps {
  onFiltersChange?: (filters: FilterToken[]) => void;
  placeholder?: string;
  onSaveSearch?: (filters: FilterToken[]) => void;
}

const FilterInLine: React.FC<FilterInLineProps> = ({
  onFiltersChange,
  placeholder = "Filtrar por tipo:, nivel:, fecha:...",
  onSaveSearch,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState<FilterToken[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilterKey, setSelectedFilterKey] = useState<string | null>(
    null,
  );
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Color mode values
  const inputBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const suggestionBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(20, 20, 20, 0.9)",
  );
  const suggestionHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const suggestionSelectedBg = useColorModeValue("blue.100", "blue.900");
  const secondaryTextColor = useColorModeValue("gray.500", "whiteAlpha.600");

  // Obtener el tipo seleccionado de los filtros actuales
  const getSelectedTipo = (): string | null => {
    const tipoFilter = filters.find((f) => f.key === "tipo");
    return tipoFilter ? tipoFilter.value : null;
  };

  // Opciones de filtros disponibles (calculado con useMemo para actualizar cuando cambien los filtros)
  const filterOptions: FilterOption[] = useMemo(() => {
    const selectedTipo = getSelectedTipo();

    return [
      {
        key: "tipo",
        label: "Tipo",
        description: "Filtra por tipo principal",
        values: [
          "Gobierno",
          "Economía",
          "Educación",
          "Salud",
          "Seguridad",
          "Cultura",
          "Tecnología",
          "Infraestructura",
          "Ecología",
        ],
      },
      {
        key: "subtipo",
        label: "Subtipo",
        description: selectedTipo
          ? `Filtra por subtipo de ${selectedTipo}`
          : "Filtra por subtipo (requiere seleccionar un tipo primero)",
        disabled: !selectedTipo,
        subValues: {
          Gobierno: [
            "Federal",
            "Estatal",
            "Municipal",
            "Legislativo",
            "Judicial",
          ],
          Economía: [
            "Finanzas",
            "Comercio",
            "Inversión",
            "Empleo",
            "Impuestos",
          ],
          Educación: ["Básica", "Media Superior", "Superior", "Investigación"],
          Salud: ["Hospitales", "Prevención", "Epidemiología", "Servicios"],
          Seguridad: ["Policía", "Ejército", "Protección Civil", "Justicia"],
          Cultura: ["Arte", "Patrimonio", "Festivales", "Museos"],
          Tecnología: [
            "Innovación",
            "Telecomunicaciones",
            "Software",
            "Hardware",
          ],
          Infraestructura: ["Transporte", "Energía", "Agua", "Urbanismo"],
          Ecología: [
            "Conservación",
            "Contaminación",
            "Recursos Naturales",
            "Cambio Climático",
          ],
        },
      },
      {
        key: "nivel",
        label: "Nivel",
        description: "Filtra por nivel geográfico",
        values: ["Internacional", "Nacional", "Estatal", "Local"],
      },
      {
        key: "fecha",
        label: "Rango de tiempo",
        description: "Filtra por rango de tiempo",
        values: ["Un día", "Una semana", "Un mes", "Un año"],
      },
      {
        key: "ordenar",
        label: "Ordenar por",
        description: "Ordena los resultados",
        values: ["Fecha", "Impacto", "Noticias", "Likes"],
      },
      {
        key: "noticia",
        label: "Tipo de noticia",
        description: "Filtra por tipo de noticia",
        values: ["Todos", "Artículo", "Twitter", "Facebook", "Web"],
      },
      {
        key: "mapa",
        label: "Filtros de mapa",
        description: "Filtra elementos del mapa",
        values: ["Filtro geográfico", "Eventos", "Fuentes"],
      },
      {
        key: "fuentes",
        label: "Fuentes",
        description: "Filtra por fuentes específicas",
      },
      {
        key: "buscar",
        label: "Búsqueda",
        description: "Búsqueda de texto libre",
      },
    ];
  }, [filters]);

  // Manejar clicks fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideContainer = containerRef.current?.contains(target);
      const isInsideSuggestions = suggestionsRef.current?.contains(target);

      if (!isInsideContainer && !isInsideSuggestions) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Obtener sugerencias basadas en el input actual
  const getSuggestions = (): Array<{
    type: "filter" | "value" | "search";
    data: FilterOption | string;
  }> => {
    const trimmedInput = inputValue.trim().toLowerCase();

    // Si no hay filtro seleccionado, mostrar opciones de filtros
    if (!selectedFilterKey) {
      const filteredOptions = filterOptions
        .filter(
          (option) =>
            !option.disabled && // No mostrar opciones deshabilitadas
            (option.key.includes(trimmedInput) ||
              option.label.toLowerCase().includes(trimmedInput)),
        )
        .map((option) => ({ type: "filter" as const, data: option }));

      // Si hay texto y no hay coincidencias, agregar opción de búsqueda
      if (trimmedInput && filteredOptions.length === 0) {
        return [{ type: "search", data: inputValue.trim() }];
      }

      return filteredOptions;
    }

    // Si hay un filtro seleccionado, mostrar sus valores posibles
    const selectedOption = filterOptions.find(
      (opt) => opt.key === selectedFilterKey,
    );

    // Manejar subtipos basados en el tipo seleccionado
    if (selectedOption?.key === "subtipo" && selectedOption.subValues) {
      const selectedTipo = getSelectedTipo();
      if (!selectedTipo) {
        return []; // No mostrar subtipos si no hay tipo seleccionado
      }

      const subtiposDisponibles = selectedOption.subValues[selectedTipo] || [];
      const colonIndex = trimmedInput.lastIndexOf(":");
      const searchValue =
        colonIndex !== -1
          ? trimmedInput.substring(colonIndex + 1).trim()
          : trimmedInput;

      return subtiposDisponibles
        .filter((value) => value.toLowerCase().includes(searchValue))
        .map((value) => ({ type: "value" as const, data: value }));
    }

    // Manejar valores normales
    if (selectedOption?.values) {
      // Extraer solo el valor después del ":"
      const colonIndex = trimmedInput.lastIndexOf(":");
      const searchValue =
        colonIndex !== -1
          ? trimmedInput.substring(colonIndex + 1).trim()
          : trimmedInput;

      return selectedOption.values
        .filter((value) => value.toLowerCase().includes(searchValue))
        .map((value) => ({ type: "value" as const, data: value }));
    }

    return [];
  };

  const suggestions = getSuggestions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    setSuggestionIndex(0);

    // Detectar si el usuario está escribiendo un filtro con ":"
    const colonIndex = value.lastIndexOf(":");
    if (colonIndex !== -1) {
      const potentialKey = value.substring(0, colonIndex).trim().toLowerCase();
      const matchingFilter = filterOptions.find(
        (opt) => opt.key === potentialKey,
      );

      if (matchingFilter && !selectedFilterKey) {
        setSelectedFilterKey(matchingFilter.key);
      }

      // Si el usuario borra el ":" o la clave, resetear el filtro seleccionado
      if (!matchingFilter && selectedFilterKey) {
        setSelectedFilterKey(null);
      }
    } else {
      // Si no hay ":" y había un filtro seleccionado, resetearlo
      if (selectedFilterKey) {
        setSelectedFilterKey(null);
      }
    }
  };

  const addFilter = (key: string, value: string) => {
    const filterOption = filterOptions.find((opt) => opt.key === key);
    if (!filterOption) return;

    const newFilter: FilterToken = {
      key,
      label: filterOption.label,
      value,
    };

    const newFilters = [...filters, newFilter];
    setFilters(newFilters);
    onFiltersChange?.(newFilters);

    // Reset estado
    setInputValue("");
    setSelectedFilterKey(null);
    setShowSuggestions(false);
    setSuggestionIndex(0);
    inputRef.current?.focus();
  };

  const removeFilter = (index: number) => {
    const filterToRemove = filters[index];
    let newFilters = filters.filter((_, i) => i !== index);

    // Si se elimina un filtro de tipo, también eliminar los subtipos asociados
    if (filterToRemove.key === "tipo") {
      newFilters = newFilters.filter((f) => f.key !== "subtipo");
    }

    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSuggestionClick = (suggestion: {
    type: "filter" | "value" | "search";
    data: FilterOption | string;
  }) => {
    if (suggestion.type === "filter") {
      const filterData = suggestion.data as FilterOption;
      setSelectedFilterKey(filterData.key);
      setInputValue(`${filterData.key}:`);
      setShowSuggestions(true);
      setSuggestionIndex(0);
      inputRef.current?.focus();
    } else if (suggestion.type === "search") {
      const searchText = suggestion.data as string;
      addFilter("buscar", searchText);
    } else {
      const value = suggestion.data as string;
      if (selectedFilterKey) {
        addFilter(selectedFilterKey, value);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      // Si presiona Enter sin sugerencias y hay un filtro seleccionado, agregar el valor
      if (e.key === "Enter" && selectedFilterKey && inputValue.trim()) {
        // Extraer el valor después del ":"
        const colonIndex = inputValue.lastIndexOf(":");
        const value =
          colonIndex !== -1
            ? inputValue.substring(colonIndex + 1).trim()
            : inputValue.trim();

        if (value) {
          addFilter(selectedFilterKey, value);
        }
        e.preventDefault();
      }
      // Si presiona Backspace y el input está vacío, eliminar el último filtro
      if (e.key === "Backspace" && !inputValue && filters.length > 0) {
        removeFilter(filters.length - 1);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSuggestionIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSuggestionIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (suggestions[suggestionIndex]) {
          handleSuggestionClick(suggestions[suggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedFilterKey(null);
        setInputValue("");
        break;
    }
  };

  useEffect(() => {
    // Auto-scroll para mantener la sugerencia seleccionada visible
    if (suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.querySelector(
        `[data-index="${suggestionIndex}"]`,
      );
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [suggestionIndex]);

  return (
    <Box position="relative" width="100%" ref={containerRef}>
      <Flex
        bg={inputBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        minHeight="40px"
        align="center"
        px={3}
        py={1}
        gap={2}
        flexWrap="wrap"
        cursor="text"
        onClick={() => inputRef.current?.focus()}
        pr={1}
      >
        <IconSearch size={18} style={{ flexShrink: 0 }} />

        {/* Filtros como tags */}
        {filters.map((filter, index) => (
          <Tag
            key={index}
            flexShrink={0}
            color="white"
            bg="transparent"
            fontWeight="bold"
          >
            <TagLabel fontSize="xs">
              <Text as="span" textTransform="capitalize" opacity={0.6} mr={1}>
                {filter.key}
              </Text>
              {filter.value}
            </TagLabel>
            <TagCloseButton onClick={() => removeFilter(index)} />
          </Tag>
        ))}

        {/* Input */}
        <Input
          ref={inputRef}
          placeholder={filters.length > 0 ? "" : placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          border="none"
          bg="transparent"
          flex={1}
          minW="120px"
          p={0}
          height="auto"
          borderRadius={0}
          _focus={{
            boxShadow: "none",
            outline: "none",
            border: "none",
            bg: "transparent",
          }}
        />

        {/* Botón Guardar búsqueda */}
        {filters.length > 0 && (
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<IconBookmarkFilled size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onSaveSearch?.(filters);
            }}
            flexShrink={0}
          >
            Guardar búsqueda
          </Button>
        )}
      </Flex>

      {/* Sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <Portal>
          <Box
            ref={suggestionsRef}
            position="fixed"
            top={
              containerRef.current
                ? `${containerRef.current.getBoundingClientRect().bottom + 4}px`
                : "auto"
            }
            left={
              containerRef.current
                ? `${containerRef.current.getBoundingClientRect().left}px`
                : "auto"
            }
            width={
              containerRef.current
                ? `${containerRef.current.getBoundingClientRect().width}px`
                : "auto"
            }
            bg={suggestionBg}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="lg"
            boxShadow="lg"
            maxHeight="300px"
            overflowY="auto"
            zIndex={1500}
          >
            <List spacing={0}>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  data-index={index}
                  px={4}
                  py={2}
                  cursor="pointer"
                  bg={
                    index === suggestionIndex
                      ? suggestionSelectedBg
                      : "transparent"
                  }
                  _hover={{ bg: suggestionHoverBg }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  transition="background 0.1s"
                >
                  {suggestion.type === "filter" ? (
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">
                        {(suggestion.data as FilterOption).label}:
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        {(suggestion.data as FilterOption).description}
                      </Text>
                    </Box>
                  ) : suggestion.type === "search" ? (
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">
                        Buscar por este texto
                      </Text>
                      <Text fontSize="xs" color={secondaryTextColor}>
                        "{suggestion.data as string}"
                      </Text>
                    </Box>
                  ) : (
                    <Text fontSize="sm">{suggestion.data as string}</Text>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export default FilterInLine;
