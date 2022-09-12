import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, DatabaseConnectionError } from "../errors";

const router = Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    throw new DatabaseConnectionError();

    res.send("to-dodd");
  }
);

export { router as signUpRouter };
