import {
  OrderStatus,
  RouteNotFoundError,
  UnauthorizedError,
} from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("ticket");

  if (!order) {
    throw new RouteNotFoundError("");
  }
  if (order.userId !== req.currentUser!.id) {
    throw new UnauthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  await new OrderCancelledPublisher(natsWrapper.client).publish({
    id,
    ticket: {
      id: order.ticket.id,
    },
  });

  return res.status(204).send(order);
});

export { router as DeleteOrderRouter };
