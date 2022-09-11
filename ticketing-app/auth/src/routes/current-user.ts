import { Router } from "express";

const router = Router();

router.get("/currentuser", (req, res) => {
  res.send("to-do");
});

export { router as currentUserRouter };
