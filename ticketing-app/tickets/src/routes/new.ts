import express, { Request, Response } from "express";
import { withValidation, authentication } from "@saymowtickets/common";
import { body } from "express-validator";

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
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
