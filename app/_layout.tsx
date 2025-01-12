import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />;
    </QueryClientProvider>
  );
}
