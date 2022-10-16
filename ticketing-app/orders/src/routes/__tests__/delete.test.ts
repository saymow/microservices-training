import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

const buildTicket = async () => {
  const ticket = new Ticket({
    title: "title",
    price: 15,
  });
  await ticket.save();

  return ticket;
};

describe("Delete api/orders/:id Route", () => {
  it("Should cancel a order on success", async () => {
    const ticket = await buildTicket();
    const user = global.auth();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .send()
      .expect(204);

    const fetchedOrder = await Order.findById(order.id);

    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it("Should emit a order cancelation event on success", async () => {
    const ticket = await buildTicket();
    const user = global.auth();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .send()
      .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
