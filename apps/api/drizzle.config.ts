import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./sql",
  schema: "./src/db/schema/*",
  dialect: "sqlite",
  dbCredentials: {
    url: "./prod.db",
  },
});
