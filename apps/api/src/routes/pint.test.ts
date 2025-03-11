import { pingRouter } from "./ping";
import { describe, expect, it } from "bun:test";
import { Hono } from "hono";

const app = new Hono().route("/", pingRouter);

describe("pingRouter", () => {
  it("should return pong on GET /ping", async () => {
    const response = await app.request("/");
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "pong", count: expect.any(Number) });
  });

  it("should update count on POST /ping", async () => {
    const response = await app.request("/", {
      method: "POST",
      body: JSON.stringify({ count: 3 }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(json).toEqual({ message: "pong" });

    const response2 = await app.request("/");
    const json2 = await response2.json();
    expect(json2.count).toBe(3);
  });

  it("should reject count > 5 on POST /ping", async () => {
    const response = await app.request("/", {
      method: "POST",
      body: JSON.stringify({ count: 6 }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(response.status).toBe(400);
  });

  it("should reject invalid JSON on POST /ping", async () => {
    const response = await app.request("/", {
      method: "POST",
      body: JSON.stringify({ count: "invalid" }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(response.status).toBe(400);
  });
});
