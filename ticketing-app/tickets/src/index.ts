import mongoose from "mongoose";
import { app } from "./app";
import { ENV } from "./env";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWrapper.connect(
      ENV.NATS_CLUSTER_ID,
      ENV.NATS_CLIENT_ID,
      ENV.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("Listening on port 3000."));
  } catch (err) {
    console.error(err);
  }
};

start();
