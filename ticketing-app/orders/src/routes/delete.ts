import {
  OrderStatus,
  RouteNotFoundError,
  UnauthorizedError,
} from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.delete("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    throw new RouteNotFoundError("");
  }
  if (order.userId !== req.currentUser!.id) {
    throw new UnauthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  return res.status(204).send(order);
});

export { router as DeleteOrderRouter };
