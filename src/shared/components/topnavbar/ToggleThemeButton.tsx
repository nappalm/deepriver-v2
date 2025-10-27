import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export default function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue("gray.600", "whiteAlpha.700");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const hoverColor = useColorModeValue("gray.900", "white");
  const activeBg = useColorModeValue("gray.200", "whiteAlpha.300");

  return (
    <IconButton
      aria-label="toggle theme"
      variant="ghost"
      onClick={toggleColorMode}
      size="sm"
      color={color}
      _hover={{
        bg: hoverBg,
        color: hoverColor,
      }}
      _active={{
        bg: activeBg,
      }}
      icon={
        colorMode === "light" ? (
          <IconMoonFilled size={18} />
        ) : (
          <IconSunFilled size={18} />
        )
      }
    />
  );
}
