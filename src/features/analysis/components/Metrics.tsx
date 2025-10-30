import {
  Card,
  CardBody,
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
import { IconCircle } from "@/components/common";
import { MetricCardProps, MetricsProps } from "../utils/types";

const MetricCard = ({ icon, label, value, iconColor }: MetricCardProps) => (
  <Card variant="elevated">
    <CardBody p={3}>
      <Flex align="center" justify="space-between">
        <Flex direction="column" flex="1">
          <Heading fontSize="lg" fontWeight="bold" mb={1} letterSpacing="tight">
            {value}
          </Heading>
          <Text fontSize="xs" fontWeight="medium">
            {label}
          </Text>
        </Flex>
        <IconCircle size="sm">
          <Icon as={icon} boxSize={4} color={iconColor} />
        </IconCircle>
      </Flex>
    </CardBody>
  </Card>
);

const Metrics = ({ data }: MetricsProps) => (
  <Grid
    templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
    gap={4}
    width="100%"
  >
    <MetricCard
      icon={IconFileText}
      label="Documentos"
      value={data.documents}
      iconColor="blue.400"
    />
    <MetricCard
      icon={IconThumbUp}
      label="Likes"
      value={data.likes}
      iconColor="green.400"
    />
    <MetricCard
      icon={IconUser}
      label="Autores"
      value={data.authors}
      iconColor="orange.400"
    />
    <MetricCard
      icon={IconCurrencyDollar}
      label="Valuación"
      value={`$${data.valuationMXN}B`}
      iconColor="purple.400"
    />
  </Grid>
);

export default Metrics;
