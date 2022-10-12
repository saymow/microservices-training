import express, { Request, Response } from "express";

const router = express.Router();

router.post("/orders", async (req: Request, res: Response) => {
  res.send({});
});

export { router as PostOrderRouter };
