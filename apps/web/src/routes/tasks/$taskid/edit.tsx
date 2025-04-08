import { TaskForm } from "@/components/tasks/form";
import { Button } from "@/components/ui/button";
import { getTaskQueryOption, updateTask } from "@/lib/api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskid/edit")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { taskid } }) => {
    queryClient.ensureQueryData(getTaskQueryOption(taskid));
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { taskid } = Route.useParams();
  const router = useRouter();
  const { data: task, isPending } = useQuery(getTaskQueryOption(taskid));
  const { mutateAsync } = useMutation({
    mutationFn: updateTask(taskid),
    onSuccess: () => {
      router.history.back();
      queryClient.invalidateQueries({ queryKey: ["task", taskid] });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (task == undefined) return <p>404</p>;

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Link to="/tasks" className="mb-2">
          <Button variant="secondary">⬅ Back</Button>
        </Link>
        <TaskForm
          handleSubmit={mutateAsync}
          defaultValues={{
            title: task.title,
            description: task.description,
            status: task.status,
          }}
        />
      </div>
    </>
  );
}
