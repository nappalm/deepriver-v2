import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  IconBookmark,
  IconBookmarkOff,
  IconTrashFilled,
} from "@tabler/icons-react";

interface SavedSearch {
  id: string;
  name: string;
  date: string;
  filtersCount?: number;
}

export default function BookmarksMenu() {
  const savedSearches: SavedSearch[] = [
    {
      id: "1",
      name: "Claudia Sheinbaum",
      date: "13 Jun",
      filtersCount: 3,
    },
    {
      id: "2",
      name: "Reforma Energética 2024",
      date: "10 Jun",
      filtersCount: 5,
    },
    {
      id: "3",
      name: "Infraestructura CDMX",
      date: "8 Jun",
      filtersCount: 2,
    },
    {
      id: "4",
      name: "Tecnología e Innovación",
      date: "5 Jun",
      filtersCount: 4,
    },
    {
      id: "5",
      name: "Salud Pública Nacional",
      date: "2 Jun",
      filtersCount: 3,
    },
    {
      id: "6",
      name: "Economía y Finanzas",
      date: "28 May",
      filtersCount: 6,
    },
    {
      id: "7",
      name: "Educación Superior",
      date: "25 May",
      filtersCount: 2,
    },
    {
      id: "8",
      name: "Seguridad Ciudadana",
      date: "20 May",
      filtersCount: 4,
    },
  ];

  const handleSelectSearch = (search: SavedSearch) => {
    console.log("Cargar búsqueda:", search);
    // Aquí puedes implementar la lógica para cargar los filtros guardados
  };

  const handleDelete = (e: React.MouseEvent, searchId: string) => {
    e.stopPropagation();
    console.log("Eliminar búsqueda:", searchId);
    // Aquí puedes implementar la lógica para eliminar la búsqueda
  };

  return (
    <Menu>
      <MenuButton
        size="sm"
        as={IconButton}
        aria-label="Mis busquedas"
        icon={<IconBookmark size={16} />}
      />
      <MenuList minWidth="280px" maxHeight="400px" overflowY="auto">
        {savedSearches.length === 0 ? (
          <Box px={4} py={8} textAlign="center">
            <IconBookmarkOff
              size={32}
              style={{ margin: "0 auto 12px", opacity: 0.5 }}
            />
            <Text fontSize="sm">No tienes búsquedas guardadas</Text>
            <Text fontSize="xs" mt={1}>
              Usa "Guardar búsqueda" para crear una
            </Text>
          </Box>
        ) : (
          <>
            <Box
              px={4}
              py={2}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                color="gray.500"
              >
                Mis búsquedas ({savedSearches.length})
              </Text>
            </Box>
            {savedSearches.map((search, index) => (
              <Box key={search.id}>
                <MenuItem
                  onClick={() => handleSelectSearch(search)}
                  py={3}
                  px={4}
                >
                  <Flex
                    justify="space-between"
                    align="flex-start"
                    width="100%"
                    gap={2}
                  >
                    <Box flex="1" minWidth={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        noOfLines={1}
                        mb={1}
                      >
                        {search.name}
                      </Text>
                      <HStack spacing={2}>
                        <Text fontSize="xs" color="gray.500">
                          {search.date}
                        </Text>
                        {search.filtersCount && (
                          <>
                            <Text fontSize="xs">•</Text>
                            <Text fontSize="xs" color="gray.500">
                              {search.filtersCount}{" "}
                              {search.filtersCount === 1 ? "filtro" : "filtros"}
                            </Text>
                          </>
                        )}
                      </HStack>
                    </Box>
                    <IconButton
                      size="xs"
                      aria-label="Eliminar búsqueda"
                      icon={<IconTrashFilled size={14} />}
                      variant="ghost"
                      color="red.400"
                      onClick={(e) => handleDelete(e, search.id)}
                    />
                  </Flex>
                </MenuItem>
                {index < savedSearches.length - 1 && (
                  <Divider borderColor="whiteAlpha.100" />
                )}
              </Box>
            ))}
          </>
        )}
      </MenuList>
    </Menu>
  );
}
