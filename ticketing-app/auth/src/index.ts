import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import * as routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors";

const app = express();

app.use(express.json());

Object.values(routes).forEach((route) => {
  app.use("/api/users", route);
});

app.all("*", (req) => {
  throw new RouteNotFoundError(req.originalUrl);
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Listening on port 3000."));
  } catch (err) {
    console.error(err);
  }
};

start();
