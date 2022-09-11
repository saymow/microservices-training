import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  res.send("to-do");
});

export { router as signUpRouter };
