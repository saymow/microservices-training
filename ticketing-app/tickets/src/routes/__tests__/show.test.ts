import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

describe("Show api/tickets/:id Route", () => {
  it("Should return 404 if not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it("Should return a ticket on success", async () => {
    const title = "valid-title";
    const price = 20;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({ title, price })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});
