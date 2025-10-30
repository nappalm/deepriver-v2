import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

interface MetricItem {
  id: string;
  name: string;
  value: number;
}

interface TableMetricsProps {
  data?: MetricItem[];
}

const TableMetrics = ({ data }: TableMetricsProps) => {
  // Datos de ejemplo
  const defaultData: MetricItem[] = [
    { id: "1", name: "Donald Trump", value: 115 },
    { id: "2", name: "Claudia Sheinbaum", value: 114 },
    { id: "3", name: "Joe Biden", value: 98 },
    { id: "4", name: "Andrés Manuel López Obrador", value: 87 },
    { id: "5", name: "Vladimir Putin", value: 76 },
    { id: "6", name: "Xi Jinping", value: 72 },
    { id: "7", name: "Emmanuel Macron", value: 65 },
    { id: "8", name: "Luiz Inácio Lula da Silva", value: 58 },
    { id: "9", name: "Gustavo Petro", value: 52 },
    { id: "10", name: "Gabriel Boric", value: 45 },
  ];

  const metrics = data || defaultData;
  const maxValue = Math.max(...metrics.map((item) => item.value));

  return (
    <VStack spacing={0} align="stretch" height="100%" minH="0">
      <Heading size="sm" mb={3} flexShrink={0}>
        Métricas de Impacto
      </Heading>
      <Box
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="lg"
        flex="1"
        minH="0"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflowY="auto"
        >
          <Table variant="simple" size="sm">
            <Thead bg="whiteAlpha.50">
              <Tr>
                <Th>Nombre</Th>
                <Th>Valor</Th>
                <Th>Impacto</Th>
              </Tr>
            </Thead>
            <Tbody>
              {metrics.map((item) => {
                const percentage = (item.value / maxValue) * 100;
                return (
                  <Tr
                    key={item.id}
                    cursor="pointer"
                    _hover={{ bg: "whiteAlpha.100" }}
                    transition="background 0.2s"
                  >
                    <Td p={2} borderColor="whiteAlpha.200">
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                        {item.name}
                      </Text>
                    </Td>
                    <Td p={2} borderColor="whiteAlpha.200">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={
                          percentage >= 80
                            ? "blue.300"
                            : percentage >= 60
                              ? "blue.400"
                              : percentage >= 40
                                ? "blue.500"
                                : "blue.600"
                        }
                      >
                        {item.value}
                      </Text>
                    </Td>
                    <Td p={2} borderColor="whiteAlpha.200">
                      <Box
                        position="relative"
                        bg="whiteAlpha.100"
                        borderRadius="lg"
                        p={1.5}
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        boxShadow="inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)"
                      >
                        <Box
                          h="6px"
                          w={`${percentage}%`}
                          borderRadius="md"
                          bgGradient={
                            percentage >= 80
                              ? "linear(to-r, blue.400, blue.300)"
                              : percentage >= 60
                                ? "linear(to-r, blue.500, blue.400)"
                                : percentage >= 40
                                  ? "linear(to-r, blue.600, blue.500)"
                                  : "linear(to-r, blue.700, blue.600)"
                          }
                          transition="width 0.3s ease"
                          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                        />
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </VStack>
  );
};

export default TableMetrics;
