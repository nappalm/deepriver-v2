import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
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
  if (active && payload && payload.length) {
    return (
      <Box
        bg="#0A0A0A"
        border="1px solid"
        borderColor="whiteAlpha.200"
        p={3}
        borderRadius="md"
        backdropFilter="blur(10px)"
      >
        <Text color="white" fontSize="sm" fontWeight="bold" mb={1}>
          {label}
        </Text>
        <Text color="whiteAlpha.700" fontSize="sm">
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

  return (
    <Card
      bg="#0A0A0A"
      color="white"
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor="whiteAlpha.200"
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
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
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
