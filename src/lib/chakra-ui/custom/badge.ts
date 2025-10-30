import {
  defineCssVars,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system";
import { mode, transparentize } from "@chakra-ui/theme-tools";

const vars = defineCssVars("badge", ["bg", "color", "shadow"]);

const baseStyle = defineStyle({
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "md",
  fontWeight: "semibold",
  bg: vars.bg.reference,
  color: vars.color.reference,
  boxShadow: "none",
});

const variantSolid = defineStyle((props) => {
  const { colorScheme: c, theme } = props;
  const dark = transparentize(`${c}.500`, 0.6)(theme);
  return {
    [vars.bg.variable]: `colors.${c}.500`,
    [vars.color.variable]: "colors.white",
    _dark: {
      [vars.bg.variable]: dark,
      [vars.color.variable]: "colors.whiteAlpha.800",
    },
  };
});

const variantSubtle = defineStyle((props) => {
  const { colorScheme: c, theme } = props;
  const darkBg = transparentize(`${c}.500`, 0.16)(theme);
  return {
    [vars.bg.variable]: `colors.${c}.500`,
    [vars.color.variable]: `colors.${c}.50`,
    _dark: {
      [vars.bg.variable]: darkBg,
      [vars.color.variable]: `colors.${c}.500`,
    },
  };
});

const variantOutline = defineStyle((props) => {
  const { colorScheme: c, theme } = props;
  const darkColor = transparentize(`${c}.200`, 0.8)(theme);
  return {
    [vars.color.variable]: `colors.${c}.500`,
    _dark: {
      [vars.color.variable]: darkColor,
    },
    [vars.shadow.variable]: `inset 0 0 0px 1px ${vars.color.reference}`,
  };
});

const variantBordered = defineStyle((props) => ({
  [vars.bg.variable]: mode("colors.gray.100", "colors.whiteAlpha.200")(props),
  [vars.color.variable]: mode("colors.gray.900", "colors.white")(props),
  borderWidth: "1px",
  borderColor: mode("gray.300", "whiteAlpha.300")(props),
  textTransform: "none",
  fontSize: "2xs",
  px: 1.5,
  py: 0.5,
}));

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
  bordered: variantBordered,
};

const badgeTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
    colorScheme: "gray",
  },
});

export default badgeTheme;

export { vars as badgeVars, badgeTheme };
