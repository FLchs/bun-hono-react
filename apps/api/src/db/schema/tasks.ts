import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createSchemaFactory, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const taskStatus = ["pending", "in_progress", "completed"] as const;

export const tasksTable = sqliteTable("tasks", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text({ length: 255 }).notNull(),
  description: text(),
  status: text({ enum: taskStatus }),
  created_at: integer({ mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  updated_at: integer({ mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
});

export const { createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const pureTaskInsertSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(taskStatus),
});

export const taskInsertSchema = createInsertSchema(tasksTable);
export const taskSelectSchema = createSelectSchema(tasksTable);
export type TaskStatus = (typeof taskStatus)[number];
