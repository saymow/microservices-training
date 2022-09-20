import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import * as routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors";
import { ensureEnvVariables } from "./env";

const app = express();

ensureEnvVariables();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

Object.values(routes).forEach((route) => {
  app.use("/api/users", route);
});

app.all("*", (req) => {
  throw new RouteNotFoundError(req.originalUrl);
});
app.use(errorHandler);

export { app };
