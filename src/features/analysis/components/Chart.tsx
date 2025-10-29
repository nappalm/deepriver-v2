import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
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

const Chart: React.FC<ChartProps> = ({
  data,
  title = "Actividad Reciente",
  color = "#8b5cf6",
  showArea = true,
}) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const avgValue = Math.round(totalValue / data.length);
  const maxValue = Math.max(...data.map((item) => item.value));

  const bg = useColorModeValue(
    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)",
  );
  const textColor = useColorModeValue("gray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
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
  const hoverBg = useColorModeValue(
    "linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)",
    "linear-gradient(135deg, #111 0%, #1f1f1f 100%)",
  );

  return (
    <Card
      bgGradient={bg}
      color={textColor}
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      height="100%"
      borderRadius="2xl"
      boxShadow="sm"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        bgGradient: hoverBg,
        boxShadow: "lg",
        transform: "translateY(-2px)",
        borderColor: useColorModeValue("gray.300", "whiteAlpha.300"),
      }}
    >
      <CardBody p={4} position="relative" zIndex={1}>
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
                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="0" dy="2" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
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

      {/* Elementos decorativos */}
      <Box
        position="absolute"
        top="-30px"
        right="-30px"
        width="150px"
        height="150px"
        bgGradient={useColorModeValue(
          `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
        )}
        borderRadius="full"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-20px"
        left="-20px"
        width="100px"
        height="100px"
        bgGradient={useColorModeValue(
          "radial-gradient(circle, #f1f5f910 0%, transparent 70%)",
          "radial-gradient(circle, #ffffff05 0%, transparent 70%)",
        )}
        borderRadius="full"
        filter="blur(40px)"
        pointerEvents="none"
      />
    </Card>
  );
};

export default Chart;
