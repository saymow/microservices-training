import nats from "node-nats-streaming";

console.clear();

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("publisher connected");

  const data = JSON.stringify({
    id: "id",
    title: "title",
    price: 20,
  });

  client.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
