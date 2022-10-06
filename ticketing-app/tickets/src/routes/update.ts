import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
  authentication,
  RouteNotFoundError,
  UnauthorizedError,
  withValidation,
} from "@saymowtickets/common";

const router = express.Router();

router.put(
  "/tickets/:id",
  authentication,
  ...withValidation(
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
  ),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const userId = req.currentUser!.id;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new RouteNotFoundError("ticket id " + id);
    }
    if (ticket.userId !== userId) {
      throw new UnauthorizedError();
    }

    ticket.set({ title, price });
    await ticket.save();

    return res.send(ticket);
  }
);

export { router as updateTicketRouter };
