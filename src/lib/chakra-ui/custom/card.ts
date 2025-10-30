import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "xl",
  },
  header: {},
  body: {
    borderRadius: "inherit",
  },
  footer: {},
});

const solidVariant = definePartsStyle((props) => ({
  container: {
    boxShadow: "none",
    transition: "all ease-in-out 300ms",
    bg: mode(`gray.100`, `whiteAlpha.50`)(props),
  },
  body: {
    bg: mode(`gray.200`, `whiteAlpha.200`)(props),
    borderRadius: "xl",
  },
}));

const outlineVariant = definePartsStyle((props) => ({
  container: {
    boxShadow: "none",
    transition: "all ease-in-out 300ms",
    borderWidth: "1px",
    borderColor: mode("gray.300", "whiteAlpha.300")(props),
    bg: "transparent",
  },
  body: {
    bg: "transparent",
  },
  header: {
    borderRadius: "inherit",
    borderBottomRadius: 0,
    bg: mode("gray.200", "whiteAlpha.200")(props),
  },
  footer: {
    borderTopWidth: "1px",
  },
}));

const elevatedVariant = definePartsStyle((props) => ({
  container: {
    bg: mode("gray.50", "#0A0A0A")(props),
    overflow: "hidden",
    position: "relative",
    transition: "all 0.3s ease",
    borderWidth: "1px",
    borderColor: mode("gray.200", "whiteAlpha.200")(props),
    shadow: "sm",
    _hover: {
      transform: "translateY(-2px)",
      shadow: "lg",
      bg: mode("#f9f9f9", "#111")(props),
    },
    _before: {
      content: '""',
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "60px",
      height: "60px",
      bg: mode("blackAlpha.100", "whiteAlpha.100")(props),
      borderRadius: "full",
      filter: "blur(20px)",
      pointerEvents: "none",
    },
  },
  body: {
    bg: "transparent",
  },
}));

const sizes = {};
const variants = {
  solid: solidVariant,
  outline: outlineVariant,
  elevated: elevatedVariant,
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    variant: "elevated",
  },
});
