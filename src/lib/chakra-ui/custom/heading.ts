import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  variants: {
    titleUnderline: {
      textDecoration: "underline",
      fontSize: 20,
      textUnderlineOffset: 6,
      textDecorationColor: "initial",
      textDecorationThickness: 4,
      marginTop: 3,
      marginBottom: 4,
    },
  },
});
