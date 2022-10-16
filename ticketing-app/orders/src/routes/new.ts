import {
  authentication,
  BadRequestError,
  OrderStatus,
  RouteNotFoundError,
  withValidation,
} from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/orders",
  authentication,
  ...withValidation(
    body("ticketId").not().isEmpty().withMessage("TicketId must be provided")
  ),
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new RouteNotFoundError("ticket not found");
    }

    if (await ticket.isReserved()) {
      throw new BadRequestError("Ticket has already been taken.");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    return res.status(201).send(order);
  }
);

export { router as PostOrderRouter };
