import { Circle, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IconCircleProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "32px",
  md: "40px",
  lg: "48px",
};

export const IconCircle = ({ children, size = "sm" }: IconCircleProps) => {
  const circleBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const circleBorderColor = useColorModeValue("gray.300", "whiteAlpha.300");

  return (
    <Circle
      size={sizeMap[size]}
      bg={circleBg}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={circleBorderColor}
      flexShrink={0}
    >
      {children}
    </Circle>
  );
};
