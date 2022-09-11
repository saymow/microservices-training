import { Router } from "express";

const router = Router();

router.post("/signout", (req, res) => {
  res.send("to-do");
});

export { router as signOutRouter };
