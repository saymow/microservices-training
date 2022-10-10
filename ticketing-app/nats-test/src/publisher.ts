import nats from "node-nats-streaming";
import { Subjects } from "./events/subjects";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("publisher connected");

  const data = {
    id: "id",
    title: "title",
    price: 20,
  };

  new TicketCreatedPublisher(client).publish(data);
});
