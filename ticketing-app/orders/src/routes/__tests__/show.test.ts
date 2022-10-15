import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = new Ticket({
    title: "title",
    price: 15,
  });
  await ticket.save();

  return ticket;
};

describe("Get api/orders/:id Route", () => {
  it("Should return order for a particular user", async () => {
    const ticket = await buildTicket();
    const user = global.auth();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    const response = await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .expect(200);

    expect(response.body.id).toEqual(order.id);
    expect(response.body.title).toEqual(order.title);
    expect(response.body.ticket).toEqual(order.ticket);
  });

  it("Should not return order for another user's order", async () => {
    const ticket = await buildTicket();
    const user = global.auth();
    const user2 = global.auth();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", user2)
      .expect(401);
  });
});
