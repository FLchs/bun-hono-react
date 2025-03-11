import { z } from "zod";
import { Hono } from "hono";
import { validate } from "../lib/validator";


let count = 0;

const postSchema = z.object({
  count: z.number().max(5),
});


const pingRouter = new Hono()
  .get("/", (c) => {
    return c.json({ message: "pong", count });
  }).post("/", validate("json", postSchema), (c) => {
    count = c.req.valid("json").count;
    return c.json({ message: "pong" }, 201);
  });

export { pingRouter };
