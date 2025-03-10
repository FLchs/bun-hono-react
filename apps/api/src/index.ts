import { Hono } from "hono";
import { pingRouter } from "./routes/ping";

const app = new Hono().route("/ping", pingRouter);

export default app;
export type AppType = typeof app;
