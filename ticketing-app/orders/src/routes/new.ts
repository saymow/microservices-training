import {
  authentication,
  BadRequestError,
  OrderStatus,
  RouteNotFoundError,
  withValidation,
} from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";

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

    return res.status(201).send(order);
  }
);

export { router as PostOrderRouter };
