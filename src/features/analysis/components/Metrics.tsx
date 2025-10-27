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
  return (
    <Card
      bg="#000"
      color="white"
      overflow="hidden"
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "2xl",
        bg: "#111",
      }}
      height="100%"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <CardBody p={isLarge ? 8 : 6}>
        <Flex direction="column" justify="space-between" height="100%">
          <Box>
            <Circle
              size={isLarge ? "56px" : "48px"}
              bg="whiteAlpha.200"
              backdropFilter="blur(10px)"
              mb={4}
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              <Icon as={icon} boxSize={isLarge ? 8 : 6} color={iconColor} />
            </Circle>
          </Box>
          <Box>
            <Heading
              fontSize={isLarge ? "3xl" : "2xl"}
              fontWeight="bold"
              mb={2}
              letterSpacing="tight"
              noOfLines={1}
              color="white"
            >
              {value}
            </Heading>
            <Text
              fontSize={isLarge ? "md" : "sm"}
              color="whiteAlpha.700"
              fontWeight="medium"
            >
              {label}
            </Text>
          </Box>
        </Flex>
      </CardBody>
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
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      templateRows={{ base: "repeat(4, 1fr)", md: "repeat(2, 1fr)" }}
      gap={3}
      height={{ base: "auto", md: "400px" }}
    >
      <Box
        gridColumn={{ base: "span 2", md: "span 2" }}
        gridRow={{ base: "span 1", md: "span 2" }}
      >
        <MetricCard
          icon={IconCurrencyDollar}
          label="Valuación"
          value={formatCurrency(data.valuationMXN)}
          iconColor="purple.400"
          isLarge={true}
        />
      </Box>
      <Box
        gridColumn={{ base: "span 2", md: "span 2" }}
        gridRow={{ base: "span 1", md: "span 1" }}
      >
        <MetricCard
          icon={IconFileText}
          label="Documentos"
          value={formatNumber(data.documents)}
          iconColor="blue.400"
        />
      </Box>
      <Box
        gridColumn={{ base: "span 1", md: "span 1" }}
        gridRow={{ base: "span 1", md: "span 1" }}
      >
        <MetricCard
          icon={IconThumbUp}
          label="Likes"
          value={formatNumber(data.likes)}
          iconColor="green.400"
        />
      </Box>
      <Box
        gridColumn={{ base: "span 1", md: "span 1" }}
        gridRow={{ base: "span 1", md: "span 1" }}
      >
        <MetricCard
          icon={IconUser}
          label="Autores"
          value={formatNumber(data.authors)}
          iconColor="orange.400"
        />
      </Box>
    </Grid>
  );
};

export default Metrics;
