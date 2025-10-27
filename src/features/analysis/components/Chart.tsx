import { Box, Card, CardBody, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

interface ChartProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
  showArea?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  const tooltipBg = useColorModeValue("#ffffff", "#0A0A0A");
  const tooltipBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const tooltipTextColor = useColorModeValue("gray.900", "white");
  const tooltipDescColor = useColorModeValue("gray.600", "whiteAlpha.700");

  if (active && payload && payload.length) {
    return (
      <Box
        bg={tooltipBg}
        border="1px solid"
        borderColor={tooltipBorderColor}
        p={3}
        borderRadius="md"
        backdropFilter="blur(10px)"
      >
        <Text color={tooltipTextColor} fontSize="sm" fontWeight="bold" mb={1}>
          {label}
        </Text>
        <Text color={tooltipDescColor} fontSize="sm">
          {payload[0].value.toLocaleString()} eventos
        </Text>
      </Box>
    );
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({
  data,
  title = "Actividad Reciente",
  color = "#8b5cf6",
  showArea = true,
}) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const avgValue = Math.round(totalValue / data.length);
  const maxValue = Math.max(...data.map((item) => item.value));

  const bg = useColorModeValue("#ffffff", "#0A0A0A");
  const textColor = useColorModeValue("gray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const gridColor = useColorModeValue("rgba(0,0,0,0.05)", "rgba(255,255,255,0.05)");
  const axisColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");
  const tickColor = useColorModeValue("rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)");

  return (
    <Card
      bg={bg}
      color={textColor}
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      height="100%"
    >
      <CardBody p={4}>
        <Heading size="sm" mb={3}>
          {title}
        </Heading>

        <Box height="120px" width="100%">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={axisColor}
                tick={{ fill: tickColor, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill="url(#colorValue)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
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

export default Chart;
