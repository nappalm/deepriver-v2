import {
  Card,
  CardBody,
  Circle,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
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
  color: string;
}> = ({ icon, label, value, color }) => {
  return (
    <Card>
      <CardBody>
        <Flex align="center" mb={4}>
          <Circle size="48px" bg={color} color="white" mr={3}>
            <Icon as={icon} boxSize={6} />
          </Circle>
          <Heading size="xl" fontWeight="bold">
            {value}
          </Heading>
        </Flex>
        <Text color="gray.600" fontSize="sm">
          {label}
        </Text>
      </CardBody>
    </Card>
  );
};

const Metrics: React.FC<MetricsProps> = ({ data }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("es-MX").format(value);
  };

  return (
    <SimpleGrid columns={1} spacing={0}>
      <MetricCard
        icon={IconFileText}
        label="Documentos"
        value={formatNumber(data.documents)}
        color="blue.500"
      />
      <MetricCard
        icon={IconThumbUp}
        label="Likes"
        value={formatNumber(data.likes)}
        color="green.500"
      />
      <MetricCard
        icon={IconUser}
        label="Autores"
        value={formatNumber(data.authors)}
        color="orange.500"
      />
      <MetricCard
        icon={IconCurrencyDollar}
        label="Valuación MXN"
        value={formatCurrency(data.valuationMXN)}
        color="purple.500"
      />
    </SimpleGrid>
  );
};

export default Metrics;
