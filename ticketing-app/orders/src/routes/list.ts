import express, { Request, Response } from "express";

const router = express.Router();

router.get("/orders", async (req: Request, res: Response) => {
  res.send({});
});

export { router as ListOrderRouter };
