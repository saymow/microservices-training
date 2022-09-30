import request from "supertest";
import { app } from "../../app";

describe("api/tickets Route", () => {
  it("Should be defined", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.statusCode).not.toBe(404);
  });

  it("Should should have authentication", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  it("Should returns an error on invalid input (title)", async () => {});

  it("Should returns an error on invalid input (price)", async () => {});

  it("Should should create a ticket on success", async () => {});
});
