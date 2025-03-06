import { Hono } from "hono";
import { itemsRoute } from "./routes/items";

const app = new Hono();

export const route = app.get(
  "/date",
  async (c) => {
    return c.json(
      {
        ok: true,
        date: new Date().toISOString(),
      },
      200
    );
  }
).route("/items", itemsRoute);


export default app;
export type AppType = typeof route
