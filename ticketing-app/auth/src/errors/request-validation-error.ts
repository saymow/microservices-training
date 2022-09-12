import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;

  constructor(private readonly errors: ValidationError[]) {
    super("RequestValidationError");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      field: error.param,
      message: error.msg,
    }));
  }
}
