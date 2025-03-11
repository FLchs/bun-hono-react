import { Hono } from "hono";
import { pingRouter } from "./routes/ping";
import { HTTPException } from "hono/http-exception";
import { ApiError } from "@cm3k/core";

const app = new Hono().route("/ping", pingRouter).onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      new ApiError(error.message, JSON.stringify({ error: error.cause })),
      error.status ?? 500,
    );
  }
  return c.json(new ApiError("Internal server error", error.message), 500);
});

export default app;
export type AppType = typeof app;
