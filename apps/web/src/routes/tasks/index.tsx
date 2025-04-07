import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { taskInsertSchema, taskStatus, TaskStatus } from "@cm3k/api/schema";
import { z } from "zod";
import { createTask, getTasksQueryOption } from "@api/tasks";
import { TextInput } from "@/components/form/input/text";
import { SelectInput } from "@/components/form/input/select";
import { TextArea } from "@/components/form/input/textarea";
import { TaskItem } from "@/components/tasks/task";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tasks/")({
  component: TasksList,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getTasksQueryOption);
  },
});

function TasksList() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery(getTasksQueryOption);

  const { mutate, error } = useMutation({
    mutationFn: createTask,
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
      {isPending
        ? "Loading..."
        : data?.map((task) => <TaskItem key={task.id} task={task} />)}
    </>
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
