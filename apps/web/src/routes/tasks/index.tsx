import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTasksQueryOption } from "@api/tasks";
import { TaskItem } from "@/components/tasks/task";
import { TaskForm } from "@/components/tasks/form";

export const Route = createFileRoute("/tasks/")({
  component: TasksList,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getTasksQueryOption);
  },
});

function TasksList() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery(getTasksQueryOption);

  const { mutateAsync, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      <h1 className="text-2xl">Tasks</h1>

      <TaskForm handleSubmit={mutateAsync} />
      <p>{error?.message}</p>
      <pre>{error?.issues}</pre>
      {isPending
        ? "Loading..."
        : data?.map((task) => <TaskItem key={task.id} task={task} />)}
    </>
  );
}
