import { AppType } from "@cm3k/api/app";
import { ApiError } from "@cm3k/core";
import { hc } from "hono/client";

const customFetch: typeof fetch = async (input, init) => {
  console.log("Custom fetch:", input, init);

  const response = await fetch(input, init);
  if (response.status === 400) {
    const data = (await response.json()) as { message: string; issues: string };
    throw new ApiError("Invalid request: " + data.message, data.issues);
  }
  return response;
};

export const client = hc<AppType>("http://localhost:3000/", {
  fetch: customFetch,
});
