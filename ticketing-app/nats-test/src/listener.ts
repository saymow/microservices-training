import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const client = nats.connect("ticketing", randomBytes(4).toString('hex'), {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("listener connected");

  const subscription = client.subscribe("ticket:created", "listener-queue-group");

  subscription.on("message", (msg) => {
    const [seq, data] = [msg.getSequence(), msg.getData()];
    console.log(`Received event ${seq}: ${data}`);
  });
});
