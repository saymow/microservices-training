import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";

export const authentication = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }

  next();
};
