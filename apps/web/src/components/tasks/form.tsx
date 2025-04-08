import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { taskInsertSchema, taskStatus, TaskStatus } from "@cm3k/api/schema";
import { z } from "zod";
import { TextInput } from "@/components/form/input/text";
import { SelectInput } from "@/components/form/input/select";
import { TextArea } from "@/components/form/input/textarea";
import { Button } from "@/components/ui/button";

export function TaskForm({
  handleSubmit,
  defaultValues = { title: "" },
}: {
  handleSubmit: (data: z.infer<typeof taskInsertSchema>) => Promise<unknown>;
  defaultValues?: z.infer<typeof taskInsertSchema>;
}) {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      status: taskStatus[0],
    } as z.infer<typeof taskInsertSchema>,
    validators: {
      onChange: taskInsertSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await handleSubmit(value);
      formApi.reset();
    },
  });

  return (
    <form
      className="flex flex-col gap-4 my-4 w-96"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} loading={isSubmitting}>
            Submit
          </Button>
        )}
      />
    </form>
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
