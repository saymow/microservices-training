import nats from "node-nats-streaming";

console.clear()

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("publisher connected");

  const data = JSON.stringify({
		test: true
	})

	client.publish('ticket:created', data, () => {
		console.log('Event published')
	})
});
