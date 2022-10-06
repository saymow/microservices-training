import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

interface TicketParams {
  title: string;
  price: number;
}

const createTicket = (params: TicketParams) => {
  const { title, price } = params;

  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.auth())
    .send({ title, price })
    .expect(201);
};

describe("List api/tickets Route", () => {
  it("Should return a list of ticket on success", async () => {
    const ticket1Params: TicketParams = {
      title: "valid-title",
      price: 20,
    };
    const ticket2Params: TicketParams = {
      title: "valid-title",
      price: 20,
    };

    await createTicket(ticket1Params);
    await createTicket(ticket2Params);

    const ticketListResponse = await request(app)
      .get("/api/tickets")
      .send()
      .expect(200);

    expect(ticketListResponse.body.length).toEqual(2);
    expect(ticketListResponse.body[0].title).toEqual(ticket1Params.title);
    expect(ticketListResponse.body[0].price).toEqual(ticket1Params.price);
    expect(ticketListResponse.body[1].title).toEqual(ticket2Params.title);
    expect(ticketListResponse.body[1].price).toEqual(ticket2Params.price);
  });
});
