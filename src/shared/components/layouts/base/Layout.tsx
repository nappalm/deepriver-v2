import { Box, Container, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { TopnavBar } from "../../topnavbar";

export default function Layout() {
  return (
    <Stack overflowX="hidden">
      <Box as="main">
        <TopnavBar />

        <Container maxW="full" py={5} overflowX="hidden">
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
}
