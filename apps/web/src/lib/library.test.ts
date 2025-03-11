import { describe, it, expect } from "bun:test";
import { client } from "./client";

describe("customFetch", () => {
  it("should throw an ApiError on 400 status", async () => {
    expect(client.ping.$get()).rejects.toThrowError();
  });
});
