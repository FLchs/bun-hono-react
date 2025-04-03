import { InferRequestType, InferResponseType } from 'hono';
import { client } from "../client";

export const getTasks = async () => {
  const response = await client.api.tasks.$get();
  return await response.json();
};

export type TasksResponse = InferResponseType<typeof client.api.tasks.$get>;
export type Tasks = TasksResponse["tasks"];
export type Task = Tasks[number];

export const createTask = async (
  data: InferRequestType<typeof client.api.tasks.$post>,
) => {
  return await client.api.tasks.$post(data);
};

export const deleteTask = async (id: number) => {
  await client.api.tasks[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
};
