import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle((props) => ({
  list: {
    py: 0,
    bg: mode("rgba(255, 255, 255, 0.8)", "rgba(20, 20, 20, 0.8)")(props),
    backdropFilter: "blur(10px)",
    border: "1px solid",
    borderColor: mode("gray.200", "gray.800")(props),
    p: 1,
    boxShadow: "sm",
    borderRadius: "xl",
    overflow: "hidden",
  },
  item: {
    bg: "transparent",
    borderTopRadius: "md",
    borderBottomRadius: "md",
    fontWeight: 500,
    fontSize: "sm",
    _focus: {
      bg: mode("gray.200", "gray.800")(props),
    },
  },
  divider: {
    my: 1,
    borderBottom: "1px solid",
    borderColor: mode("gray.200", "gray.800")(props),
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
}));

export default defineMultiStyleConfig({ baseStyle });
