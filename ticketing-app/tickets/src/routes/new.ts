import express, { Request, Response } from "express";
import { withValidation, authentication } from "@saymowtickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/tickets",
  authentication,
  ...withValidation(
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({
        gt: 0,
      })
      .withMessage("Price must be greater than 0")
  ),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.currentUser!.id;
    const ticket = Ticket.build({
      title,
      userId,
      price,
    });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
