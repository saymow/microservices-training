import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("listener connected");

  const option = client
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');
  const subscription = client.subscribe(
    "ticket:created",
    "listener-queue-group",
    option
  );

  subscription.on("close", () => {
    console.log("NATS process terminated.");
    process.exit();
  });

  subscription.on("message", (msg) => {
    const [seq, data] = [msg.getSequence(), msg.getData()];

    console.log(`Received event ${seq}: ${data}`);

    msg.ack();
  });
});

process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
