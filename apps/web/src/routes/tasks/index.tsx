import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { taskInsertSchema, taskStatus, TaskStatus } from "@cm3k/api/schema";
import { z } from "zod";
import { createTask, deleteTask, getTasks } from "@api/tasks";
import { TextInput } from "@/components/form/input/text";
import { SelectInput } from "@/components/form/input/select";
import { TextArea } from "@/components/form/input/textarea";
import { Button } from "@/components/form/button";

export const Route = createFileRoute("/tasks/")({
  component: TasksList,
});

function TasksList() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { mutate, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: deleteT } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const form = useForm({
    defaultValues: {
      status: taskStatus[0],
    } as z.infer<typeof taskInsertSchema>,
    validators: {
      onChange: taskInsertSchema,
    },
    onSubmit({ value, formApi }) {
      mutate({ json: value });
      formApi.reset();
    },
  });

  return (
    <>
      <h1 className="text-2xl">Tasks</h1>
      <form
        className="flex flex-col gap-4 my-4 w-96"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <TextInput
                title="Title:"
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Field
          name="status"
          children={(field) => (
            <>
              <SelectInput
                title="Status:"
                id={field.name}
                name={field.name}
                value={field.state.value as TaskStatus}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.value as TaskStatus)
                }
              >
                {taskStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
                <option>wrong</option>
              </SelectInput>
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <>
              <TextArea
                title="Description:"
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <Button type="submit">
          {form.state.isSubmitting ? "..." : "Submit"}
        </Button>
      </form>

      <p>{error?.message}</p>
      <pre>{error?.issues}</pre>
      {data?.tasks.map((task) => (
        <Tasks
          id={task.id}
          key={task.id}
          title={task.title}
          description={task.description}
          onDelete={() => deleteT(task.id)}
        />
      ))}
    </>
  );
}

function Tasks({
  id,
  title,
  description,
  onDelete,
}: {
  id: number;
  title: string;
  description: string | null;
  onDelete: () => void;
}) {
  return (
    <div className="border-2 border-gray-900 rounded">
      <p>
        <strong className="font-bold">Title: </strong>
        {title}
      </p>
      <p>
        <strong> Description: </strong>
        {description}
      </p>
      <button type="submit" onClick={onDelete}>
        Delete
      </button>
      <Link
        type="submit"
        to="/tasks/$taskid/taskUpdate"
        params={{ taskid: id.toString() }}
      >
        Edit
      </Link>
      <hr />
    </div>
  );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <em>
          {field.state.meta.errors.map((error) => error.message).join(",")}
        </em>
      ) : undefined}
      {field.state.meta.isValidating ? "Validating..." : undefined}
    </>
  );
}
