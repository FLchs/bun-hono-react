import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  build: { sourcemap: false },
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      codeSplittingOptions: {
        splitBehavior: ({ routeId }) => {
          if (routeId == "/") {
            return [];
          }
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@api/schema": path.resolve(import.meta.dir, "../api/schema"),
      "@": path.resolve(import.meta.dirname, "./src"),
      "@api": path.resolve(import.meta.dirname, "./src/lib/api"),
    },
  },
});
