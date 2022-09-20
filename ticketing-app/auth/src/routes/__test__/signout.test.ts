import request from "supertest";
import { app } from "../../app";

describe("SignOut Route", () => {
  it("Should clear the cookie on success", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "valid-email@mail.com",
        password: "valid-password",
      })
      .expect(201);

    const response = await request(app).post("/api/users/signout").expect(204);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
