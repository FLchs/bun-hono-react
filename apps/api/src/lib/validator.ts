import { type ValidationTargets } from "hono";
import { z } from "zod";
import { ApiError } from "@cm3k/core";
import { zValidator } from "@hono/zod-validator";

export const validate = <
  // json, form, query, param, header, cookie
  Target extends keyof ValidationTargets,
  Schema extends z.ZodSchema,
>(
  target: Target,
  schema: Schema,
) => {
  return zValidator(
    target,
    schema,
    async (result, c): Promise<z.output<Schema>> => {
      if (!result.success) {
        return c.json(
          new ApiError(
            `invalid ${target}`,
            result.error.issues
              .map((issue) => `${issue.path}: ${issue.message} `)
              .join(", "),
          ),
          400,
        );
      }

      return result.data;
    },
  );
};
