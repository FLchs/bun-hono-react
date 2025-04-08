import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createSchemaFactory, createSelectSchema } from "drizzle-zod";

export const taskStatus = ["pending", "in_progress", "completed"] as const;

export const tasksTable = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text({ length: 255 }).notNull(),
  description: text(),
  status: text({ enum: taskStatus }),
  created_at: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updated_at: integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const { createInsertSchema, createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const taskInsertSchema = createInsertSchema(tasksTable);
export const taskUpdateSchema = createUpdateSchema(tasksTable);
export const taskSelectSchema = createSelectSchema(tasksTable);
export type TaskStatus = (typeof taskStatus)[number];
