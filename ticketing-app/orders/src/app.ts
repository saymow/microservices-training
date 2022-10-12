import {
  currentUser,
  errorHandler,
  RouteNotFoundError,
} from "@saymowtickets/common";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { ensureEnvVariables } from "./env";
import * as routes from "./routes";

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
app.use(currentUser);

Object.values(routes).forEach((route) => {
  app.use("/api", route);
});

app.all("*", (req) => {
  throw new RouteNotFoundError(req.originalUrl);
});
app.use(errorHandler);

export { app };
