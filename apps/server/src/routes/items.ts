import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { database } from "../db";
import { itemsTable } from "../db/schema";


const schema = z.object({
  name: z.string(),
  id: z.number()
});


export const itemsRoute = new Hono().get("/", async (c) => {
  const items = await database.select().from(itemsTable)
  return c.json(items);
}).post("/", zValidator("json", schema), async (c) => {
  const data = c.req.valid("json");
  await new Promise((resolve) => setTimeout(resolve, 200)); // Fake delay
  await database.insert(itemsTable).values(data)
  return c.json({
    success: true,
  });
});

