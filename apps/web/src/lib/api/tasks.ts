import { InferRequestType, InferResponseType } from "hono";
import { client } from "../client";
import { queryOptions } from "@tanstack/react-query";

const getTasks = async () => {
  const response = await client.api.tasks.$get();
  return await response.json();
};

export const getTasksQueryOption = queryOptions({
  queryKey: ["tasks"],
  queryFn: getTasks,
});

const getTask = async (id: string) => {
  const response = await client.api.tasks[":id{[0-9]+}"].$get({ param: { id } });
  return await response.json();
};

export const getTaskQueryOption = (id: string) => queryOptions({
  queryKey: ["task", id],
  queryFn: () => getTask(id),
});

export type TasksResponse = InferResponseType<typeof client.api.tasks.$get>;
export type Tasks = TasksResponse;
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
