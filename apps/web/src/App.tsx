import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { pureTaskInsertSchema, taskStatus, TaskStatus } from "@cm3k/api/schema";
import { z } from "zod";
import { createTask, deleteTask, getTasks } from "@api/tasks";

function App() {
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
    } as z.infer<typeof pureTaskInsertSchema>,
    validators: {
      onChange: pureTaskInsertSchema,
    },
    onSubmit({ value, formApi }) {
      mutate({ json: value });
      formApi.reset();
    },
  });

  return (
    <>
      <h1>Tasks</h1>
      <div className="card">
        <form
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="title"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Title:</label>
                <input
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
                <label htmlFor={field.name}>Status:</label>
                <select
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
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                  <option>wrong</option>
                </select>
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="description"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Description:</label>
                <input
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
          <button type="submit">
            {form.state.isSubmitting ? "..." : "Submit"}
          </button>
        </form>

        <p>{error?.message}</p>
        <pre>{error?.issues}</pre>
        {data?.tasks.map((task) => (
          <Tasks
            key={task.id}
            title={task.title}
            description={task.description}
            onDelete={() => deleteT(task.id)}
          />
        ))}
      </div>
    </>
  );
}

function Tasks({
  title,
  description,
  onDelete,
}: {
  title: string;
  description: string | null;
  onDelete: () => void;
}) {
  return (
    <div style={{ textAlign: "left" }}>
      <p>
        <strong>Title: </strong>
        {title}
      </p>
      <p>
        <strong> Description: </strong>
        {description}
      </p>
      <button type="submit" onClick={onDelete}>
        Delete
      </button>
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

export default App;
