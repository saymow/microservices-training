const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch(() => {});
  axios.post("http://localhost:4001/events", event).catch(() => {});
  axios.post("http://localhost:4002/events", event).catch(() => {});
  axios.post("http://localhost:4003/events", event).catch(() => {});

  return res.sendStatus(200);
});

app.listen(4005, () => console.log("Listening on port 4005."));
