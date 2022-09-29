import mongoose from "mongoose";
import { app } from "./app";
import { ENV } from "./env";

const start = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Listening on port 3000."));
  } catch (err) {
    console.error(err);
  }
};

start();
