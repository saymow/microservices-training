import request from "supertest";
import { app } from "../../app";

describe("CurrentUser Route", () => {
  it("Should return current user details on success", async () => {
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send({
        email: "valid-email@mail.com",
        password: "valid-password",
      })
      .expect(201);

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", authResponse.get("Set-Cookie"))
      .expect(200);

    expect(response.body.currentUser.email).toEqual("valid-email@mail.com");
  });
});
