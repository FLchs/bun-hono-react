import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/updateTask")({
  component: TasksUpdate,
});

function TasksUpdate({
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
