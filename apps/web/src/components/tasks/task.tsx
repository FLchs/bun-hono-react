import { deleteTask, Task } from "@/lib/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export const TaskItem = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteT } = useMutation({
    mutationFn: deleteTask,
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
        {new Date(task.created_at).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        })}
      </p>
      <div className="flex flex-row gap-2">
        <Link
          type="submit"
          to="/tasks/$taskid/edit"
          params={{ taskid: task.id.toString() }}
        >
          <Button>Edit</Button>
        </Link>
        <Button variant="secondary" onClick={async () => deleteT(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
