import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  build: { sourcemap: false },
  plugins: [react()],
  resolve: {
    alias: {
      "@api/schema": path.resolve(import.meta.dir, "../api/schema"),
      "@": path.resolve(import.meta.dirname, "./src"),
      "@api": path.resolve(import.meta.dirname, "./src/lib/api"),
    },
  },
});
