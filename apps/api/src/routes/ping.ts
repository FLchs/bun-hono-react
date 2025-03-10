
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";


let count = 0;

const postSchema = z.object({
  count: z.number(),
})


const pingRouter = new Hono().get("/", (c) => {
  return c.json({ message: "pong", count });
}).post("/", zValidator('json', postSchema), (c) => {
  count = c.req.valid("json").count
  return c.json({ message: "pong" });
});

export { pingRouter };
