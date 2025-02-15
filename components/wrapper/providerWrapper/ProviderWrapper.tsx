"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "@/redux/app/store.redux";

export default function ProviderWrapper({
  children
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
