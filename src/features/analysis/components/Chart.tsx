import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartProps } from "../utils/types";

const CustomTooltip = ({ active, payload, label }: any) => {
  const tooltipBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(10, 10, 10, 0.95)",
  );
  const tooltipBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const tooltipTextColor = useColorModeValue("gray.900", "white");
  const tooltipDescColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const accentColor = useColorModeValue("#3b82f6", "#60a5fa");

  if (active && payload && payload.length) {
    return (
      <Box
        bg={tooltipBg}
        border="2px solid"
        borderColor={tooltipBorderColor}
        p={3}
        borderRadius="xl"
        backdropFilter="blur(20px)"
        boxShadow="xl"
      >
        <Text
          color={tooltipTextColor}
          fontSize="xs"
          fontWeight="semibold"
          mb={1}
          letterSpacing="wide"
        >
          {label}
        </Text>
        <Text color={accentColor} fontSize="lg" fontWeight="bold">
          {payload[0].value.toLocaleString()}
        </Text>
        <Text color={tooltipDescColor} fontSize="xs" mt={0.5}>
          eventos
        </Text>
      </Box>
    );
  }
  return null;
};

const Chart = ({
  data,
  title = "Actividad Reciente",
  color = "#8b5cf6",
}: ChartProps) => {
  const textColor = useColorModeValue("gray.900", "white");
  const gridColor = useColorModeValue(
    "rgba(0,0,0,0.04)",
    "rgba(255,255,255,0.04)",
  );
  const axisColor = useColorModeValue(
    "rgba(0,0,0,0.2)",
    "rgba(255,255,255,0.2)",
  );
  const tickColor = useColorModeValue(
    "rgba(0,0,0,0.6)",
    "rgba(255,255,255,0.6)",
  );

  return (
    <Card variant="elevated" height="100%">
      <CardBody p={4}>
        <Heading
          size="xs"
          mb={3}
          fontWeight="semibold"
          letterSpacing="tight"
          color={textColor}
          textTransform="capitalize"
        >
          {title}
        </Heading>

        <Box height="80px" width="100%" position="relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={gridColor}
                vertical={false}
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="name"
                stroke={axisColor}
                tick={{ fill: tickColor, fontSize: 9, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: color,
                  strokeWidth: 2,
                  strokeDasharray: "5 5",
                  strokeOpacity: 0.5,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                fill="url(#colorValue)"
                animationDuration={1500}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: color,
                  strokeWidth: 2,
                  fill: useColorModeValue("#ffffff", "#0A0A0A"),
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Chart;
