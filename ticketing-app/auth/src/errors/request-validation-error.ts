import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super("RequestValidationError");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
