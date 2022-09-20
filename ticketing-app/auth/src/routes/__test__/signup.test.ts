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
});
