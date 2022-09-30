import express, { Request, Response } from "express";
import { currentUser, authentication } from "@saymowtickets/common";

const router = express.Router();

router.post(
  "/tickets",
  authentication,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
