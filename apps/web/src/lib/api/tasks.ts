import { InferResponseType } from "hono";
import { client } from "../client";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { taskInsertSchema } from "@cm3k/api/schema";

const getTasks = async () => {
  const response = await client.api.tasks.$get();
  return await response.json();
};

export const getTasksQueryOption = queryOptions({
  queryKey: ["tasks"],
  queryFn: getTasks,
});

const getTask = async (id: string) => {
  const response = await client.api.tasks[":id{[0-9]+}"].$get({
    param: { id },
  });
  return await response.json();
};

export const getTaskQueryOption = (id: string) =>
  queryOptions({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
  });

export const updateTask = (id: string) => {
  return async (data: z.infer<typeof taskInsertSchema>) => {
    const response = await client.api.tasks[":id{[0-9]+}"].$put({
      json: data,
      param: { id },
    });
    return await response.json();
  };
};

export type TasksResponse = InferResponseType<typeof client.api.tasks.$get>;
export type Tasks = TasksResponse;
export type Task = Tasks[number];

export const createTask = async (data: z.infer<typeof taskInsertSchema>) => {
  const resp = await client.api.tasks.$post({ json: data });
  return await resp.json();
};

export const deleteTask = (id: number) => {
  return async () =>
    await client.api.tasks[":id{[0-9]+}"].$delete({
      param: { id: id.toString() },
    });
};
