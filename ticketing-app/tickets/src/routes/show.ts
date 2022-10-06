import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { RouteNotFoundError } from "@saymowtickets/common";

const router = express.Router();

router.get("/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new RouteNotFoundError("ticket id " + id);
  }

  return res.status(200).send(ticket);
});

export { router as showTicketRouter };
