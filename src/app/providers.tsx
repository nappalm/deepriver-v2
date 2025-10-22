import { ChakraProvider, ReactQueryClient } from "@/lib";
import RouterProvider from "./router";

export default function Providers() {
  return (
    <ChakraProvider>
      <ReactQueryClient>
        <RouterProvider />
      </ReactQueryClient>
    </ChakraProvider>
  );
}
