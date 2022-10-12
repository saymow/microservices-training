import { authentication, withValidation } from "@saymowtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/orders",
  authentication,
  ...withValidation(
    body("ticketId")
      .not()
      .isEmpty()
      .withMessage("TicketId must be provided")
  ),
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as PostOrderRouter };
