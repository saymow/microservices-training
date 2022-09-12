import { CustomError } from "./custom-error";

export class RouteNotFoundError extends CustomError {
  statusCode = 404;

  constructor(private readonly url: string) {
    super(`Route not found - ${url}`);
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
