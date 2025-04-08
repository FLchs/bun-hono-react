import { deleteTask, Task } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { LocalizedDate } from "../ui/localized-date";

export const TaskItem = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteT, isPending } = useMutation({
    mutationFn: deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="bg-gray-700 rounded p-2 mb-2">
      <p>
        <strong className="font-bold">Title: </strong>
        {task.title}
      </p>
      <p>
        <strong> Description: </strong>
        {task.description}
      </p>
      <p>
        <strong>Date: </strong>
        <LocalizedDate date={task.created_at} />
      </p>
      <div className="flex flex-row gap-4 my-2">
        <Link
          type="submit"
          to="/tasks/$taskid/edit"
          params={{ taskid: task.id.toString() }}
        >
          <Button>Edit</Button>
        </Link>
        <Button
          variant="danger"
          onClick={async () => await deleteT()}
          loading={isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
