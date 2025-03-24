import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "@cm3k/core";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}

const queryClient = new QueryClient();
createRoot(document.querySelector("#root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
);
