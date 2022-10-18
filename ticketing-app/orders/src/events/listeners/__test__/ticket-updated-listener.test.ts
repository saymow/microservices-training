import { TicketUpdatedEvent } from "@saymowtickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "title",
    price: 20,
  });
  await ticket.save();
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    userId: new mongoose.Types.ObjectId().toHexString(),
    title: "new title",
    price: 9999,
  };
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, msg: msg as Message };
};

describe("TicketUpdateListener", () => {
  it("Should find, update and save a ticket", async () => {
    const { listener, data, ticket, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
  });

  it("Should acknowledge the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  it("Should not acknowledge the message if event has a skipped version number", async () => {
    const { listener, data, msg } = await setup();

    data.version++;

    try {
      await listener.onMessage(data, msg);
    } catch {}

    expect(msg.ack).not.toHaveBeenCalled();
  });
});
