import { RouteNotFoundError, UnauthorizedError } from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/orders/:id", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate("ticket");

  if (!order) {
    throw new RouteNotFoundError("");
  }
  if (order.userId !== req.currentUser!.id) {
    throw new UnauthorizedError();
  }

  return res.send(order);
});

export { router as ShowOrderRouter };
