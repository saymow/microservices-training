import mongoose from "mongoose";
import { app } from "./app";
import { ENV } from "./env";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWrapper.connect("ticketing", "adjasiop", "http://nats-srv:4222");
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Listening on port 3000."));
  } catch (err) {
    console.error(err);
  }
};

start();
