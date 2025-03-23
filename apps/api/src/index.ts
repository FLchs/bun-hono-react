import { Hono } from "hono";
import { tasksRouter } from "./routes/tasks";

const app = new Hono<{ Variables: { error: string } }>();
const apiRoutes = app.basePath("/api").route("/tasks", tasksRouter);

export default app;
export { apiRoutes };
export type AppType = typeof apiRoutes;
