import request from "supertest";
import { app } from "../../app";

describe("SignIn Route", () => {
  it("Should return 400 if inexistent email is provided", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "inexistent@mail.com",
        password: "valid-password",
      })
      .expect(400);
  });

  it("Should return 400 if incorrect password is provided", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "valid-email@mail.com",
        password: "valid-password",
      })
      .expect(201);

    return request(app)
      .post("/api/users/signin")
      .send({
        email: "valid-email@mail.com",
        password: "invalid-password",
      })
      .expect(400);
  });
});
