import {
  Box,
  Card,
  CardBody,
  Circle,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconCurrencyDollar,
  IconFileText,
  IconThumbUp,
  IconUser,
} from "@tabler/icons-react";
import React from "react";

interface MetricsData {
  documents: number;
  likes: number;
  authors: number;
  valuationMXN: number;
}

interface MetricsProps {
  data: MetricsData;
}

const MetricCard: React.FC<{
  icon: any;
  label: string;
  value: string | number;
  iconColor: string;
  isLarge?: boolean;
}> = ({ icon, label, value, iconColor, isLarge = false }) => {
  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const labelColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const circleBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const circleBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const hoverBg = useColorModeValue("#f9f9f9", "#111");

  return (
    <Card
      bg={bg}
      color={textColor}
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "lg",
        bg: hoverBg,
      }}
      height="100%"
      border="1px solid"
      borderColor={borderColor}
    >
      <CardBody p={isLarge ? 4 : 3}>
        <Flex direction="column" justify="space-between" height="100%">
          <Box>
            <Circle
              size={isLarge ? "40px" : "32px"}
              bg={circleBg}
              backdropFilter="blur(10px)"
              mb={2}
              border="1px solid"
              borderColor={circleBorderColor}
            >
              <Icon as={icon} boxSize={isLarge ? 5 : 4} color={iconColor} />
            </Circle>
          </Box>
          <Box>
            <Heading
              fontSize={isLarge ? "xl" : "lg"}
              fontWeight="bold"
              mb={1}
              letterSpacing="tight"
              noOfLines={1}
              color={textColor}
            >
              {value}
            </Heading>
            <Text
              fontSize={isLarge ? "sm" : "xs"}
              color={labelColor}
              fontWeight="medium"
            >
              {label}
            </Text>
          </Box>
        </Flex>
      </CardBody>
      <Box
        position="absolute"
        top="-10px"
        right="-10px"
        width="60px"
        height="60px"
        bg="whiteAlpha.100"
        borderRadius="full"
        filter="blur(20px)"
      />
    </Card>
  );
};

const Metrics: React.FC<MetricsProps> = ({ data }) => {
  const formatCompactNumber = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatCurrency = (value: number): string => {
    const compact = formatCompactNumber(value);
    return `$${compact}`;
  };

  const formatNumber = (value: number): string => {
    return formatCompactNumber(value);
  };

  return (
    <VStack align="start" spacing={4}>
      <Heading size="md">Métricas de Análisis</Heading>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
        gap={3}
        height={{ base: "auto", md: "300px" }}
        width="100%"
      >
        <Box gridColumn={{ base: "span 2", md: "span 2" }}>
          <MetricCard
            icon={IconFileText}
            label="Documentos"
            value={formatNumber(data.documents)}
            iconColor="blue.400"
          />
        </Box>
        <Box gridColumn={{ base: "span 2", md: "span 2" }}>
          <MetricCard
            icon={IconCurrencyDollar}
            label="Valuación"
            value={formatCurrency(data.valuationMXN)}
            iconColor="purple.400"
            isLarge={true}
          />
        </Box>
        <Box gridColumn={{ base: "span 1", md: "span 1" }}>
          <MetricCard
            icon={IconThumbUp}
            label="Likes"
            value={formatNumber(data.likes)}
            iconColor="green.400"
          />
        </Box>
        <Box gridColumn={{ base: "span 1", md: "span 1" }}>
          <MetricCard
            icon={IconUser}
            label="Autores"
            value={formatNumber(data.authors)}
            iconColor="orange.400"
          />
        </Box>
      </Grid>
    </VStack>
  );
};

export default Metrics;
