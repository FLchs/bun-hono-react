import { getTasks } from "@/lib/api/tasks";
import { QueryClient } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

const queryClient = new QueryClient();

export const Route = createFileRoute("/tasks/$taskid/edit")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { tasks } = await queryClient.ensureQueryData({
      queryKey: ["tasks"],
      queryFn: getTasks,
    });
    const task = tasks.find((t) => t.id.toString() === params.taskid);
    if (!task) throw new Error("Task not found"); // Or return null

    return task;
  },
});

function RouteComponent() {
  const task = useLoaderData({ from: "/tasks/$taskid/taskUpdate" });

  return (
    <div style={{ textAlign: "left" }}>
      <p>
        <strong>Title: </strong>
        {task.title}
      </p>
      <p>
        <strong> Description: </strong>
        {task.description}
      </p>
    </div>
  );
}
