import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("listener connected");

  client.on("close", () => {
    console.log("NATS process terminated.");
    process.exit();
  });

  new TicketCreatedListener(client).listen();
});

process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
