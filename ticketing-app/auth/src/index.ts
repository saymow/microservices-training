import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import * as routes from "./routes";

const app = express();

app.use(express.json());

Object.values(routes).forEach((route) => {
  app.use("/api/users", route);
});

app.use(errorHandler);

app.listen(3000, () => console.log("Listening on port 3000."));
