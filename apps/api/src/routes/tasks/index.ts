import { Hono } from "hono";
import { validate } from "@lib/validator";
import { db } from "@lib/db";
import {
  taskInsertSchema,
  tasksTable,
  taskUpdateSchema,
} from "@db/schema/tasks";
import { eq } from "drizzle-orm";
import { z } from "zod";

const tasksRouter = new Hono()
  .get("/", async (c) => {
    const tasks = await db.select().from(tasksTable);
    // await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
    return c.json(tasks, 200);
  })
  .post("/", validate("json", taskInsertSchema), async (c) => {
    const values = c.req.valid("json");
    await db.insert(tasksTable).values(values);
    return c.json({ success: true }, 201);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = z.coerce.number().parse(c.req.param("id"));
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));
    return c.json(task, 200);
  })
  .post("/:id{[0-9]+}", validate("json", taskUpdateSchema), async (c) => {
    const values = c.req.valid("json");
    const id = z.coerce.number().parse(c.req.param("id"));
    const [task] = await db
      .update(tasksTable)
      .set(values)
      .where(eq(tasksTable.id, id))
      .returning();
    return c.json(task, 201);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = z.coerce.number().parse(c.req.param("id"));
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
    return c.json({ success: true }, 200);
  });

export { tasksRouter };
