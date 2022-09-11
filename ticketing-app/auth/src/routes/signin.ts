import { Router } from "express";

const router = Router();

router.post("/sigin", (req, res) => {
  res.send("to-do");
});

export { router as signInRouter };
