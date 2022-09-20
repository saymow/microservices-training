import request from "supertest";
import { app } from "../../app";

describe("SignUp Route", () => {
  it("Should return 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "valid-email@mail.com",
        password: "valid-password",
      })
      .expect(201);
  });

  it("Should return 400 if email is invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "invalid-email",
        password: "valid-password",
      })
      .expect(400);
  });

  it("Should return 400 if password is invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "valid-email@mail.com",
        password: "x",
      })
      .expect(400);
  });

  it("Should return 400 if email and password are not provided", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "valid-email@mail.com" })
      .expect(400);
    
      await request(app)
      .post("/api/users/signup")
      .send({ password: "valid-password" })
      .expect(400);
  });
});
