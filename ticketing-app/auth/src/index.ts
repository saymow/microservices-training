import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import * as routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors";
import { ensureEnvVariables } from "./env";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

Object.values(routes).forEach((route) => {
  app.use("/api/users", route);
});

app.all("*", (req) => {
  throw new RouteNotFoundError(req.originalUrl);
});
app.use(errorHandler);

const start = async () => {
  try {
    ensureEnvVariables();
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Listening on port 3000."));
  } catch (err) {
    console.error(err);
  }
};

start();
