import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

describe("Update api/tickets/:id Route", () => {
  it("Should return 404 if provided id does not exists", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(404);
  });

  it("Should return 401 if user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(401);
  });

  it("Should return 401 if user does not own the ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
        price: 30,
      })
      .expect(401);
  });

  it("Should return 400 if user provide invalid params", async () => {
    const cookie = global.auth();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "valid-one",
        price: -20,
      })
      .expect(400);
  });

  it("Should update the tickets on success", async () => {
    const cookie = global.auth();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "another-valid-title",
        price: 999,
      })
      .expect(200);

    const fetchResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(fetchResponse.body.title).toEqual("another-valid-title");
    expect(fetchResponse.body.price).toEqual(999);
  });

  it("Should publish an event on success", async () => {
    const cookie = global.auth();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "another-valid-title",
        price: 999,
      })
      .expect(200);

    const fetchResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
