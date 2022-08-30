const express = require("express");
const cors = require("cors");

const app = express();
const posts = {};

const randomId = () => Math.random().toString("16");

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = randomId();

  posts[id] = { id, title };

  return res.status(201).send(posts);
});

app.listen(4000, () => console.log("Listening on port 4000."));
