"use client";
import React from "react";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient()); // yahin banao
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
