const express = require("express");
const axios = require("axios");

const app = express();
const events = [];

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);
  
  console.log(`Emitting event: ${event.type}`);
  axios.post("http://posts-clusterip-srv:4000/events", event).catch(() => {
    console.log("Can't post to posts-clusterip-srv:4000/events");
  });
  axios.post("http://comments-clusterip-srv:4001/events", event).catch(() => {
    console.log("Can't post to comments-clusterip-srv:4001/events");
  });
  axios.post("http://query-clusterip-srv:4002/events", event).catch(() => {
    console.log("Can't post to query-clusterip-srv:4002/events");
  });
  axios.post("http://moderation-srv:4003/events", event).catch(() => {
    console.log("Can't post to moderation-srv:4003/events");
  });

  return res.sendStatus(200);
});

app.get("/events", (req, res) => {
  return res.send(events);
});

app.listen(4005, () => console.log("Listening on port 4005."));
