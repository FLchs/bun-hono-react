import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("prod.db");
export const db = drizzle({ client: sqlite });
