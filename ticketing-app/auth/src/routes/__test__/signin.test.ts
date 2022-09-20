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
});
