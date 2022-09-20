import request from "supertest";
import { app } from "../../app";

describe("CurrentUser Route", () => {
  it("Should return current user details on success", async () => {
    const cookie = await global.auth();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.currentUser.email).toEqual("valid-email@mail.com");
  });

  it("Should return null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });
});
