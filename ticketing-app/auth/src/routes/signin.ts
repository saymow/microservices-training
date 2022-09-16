import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { ENV } from "../env";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { Password } from "../services/password";
import { withValidation } from "../utils/with-validation";

const router = Router();

router.post(
  "/signin",
  ...withValidation(
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply a password")
  ),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (
      !existingUser ||
      !(await Password.compare(existingUser.password, password))
    ) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      ENV.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
