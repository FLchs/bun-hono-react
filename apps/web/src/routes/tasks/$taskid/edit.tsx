import { Button } from "@/components/ui/button";
import { getTaskQueryOption } from "@/lib/api/tasks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskid/edit")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { taskid } }) => {
    queryClient.ensureQueryData(getTaskQueryOption(taskid));
  },
});

function RouteComponent() {
  const { taskid } = Route.useParams();
  const { data: task, isPending } = useQuery(getTaskQueryOption(taskid));

  if (isPending) return <p>Loading...</p>;
  if (task == undefined) return <p>404</p>;

  return (
    <div style={{ textAlign: "left" }}>
      <Link to="/tasks" className="mb-2">
        <Button variant="secondary">⬅ Back</Button>
      </Link>
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
