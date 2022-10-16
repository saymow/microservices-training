import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { Order, OrderStatus } from "../../models/order";

describe("Post api/orders Route", () => {
  it("Should return an error if ticket does not exists", async () => {
    const ticketId = new mongoose.Types.ObjectId();
    await request(app)
      .post("/api/orders")
      .set("Cookie", global.auth())
      .send({ ticketId })
      .expect(404);
  });

  it("Should return an error if ticket is already reserved", async () => {
    const ticket = Ticket.build({
      title: "title",
      price: 20,
    });
    await ticket.save();
    const order = Order.build({
      ticket,
      userId: "some-id",
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });
    await order.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", global.auth())
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  it("Should create an order on success", async () => {
    const ticket = Ticket.build({
      title: "title",
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", global.auth())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  it("Should emits a order creation event on success", async () => {
    const ticket = Ticket.build({
      title: "title",
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", global.auth())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
