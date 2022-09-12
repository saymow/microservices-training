export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super("DatabaseConnectionError");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
