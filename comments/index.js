const express = require("express");
const cors = require('cors')

const app = express();
const commentsByPostId = {};

const randomId = () => Math.random().toString("16");

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  return res.send(commentsByPostId[req.params.id] ?? []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const id = randomId();

  if (!(postId in commentsByPostId)) {
    commentsByPostId[postId] = [];
  }

  commentsByPostId[postId].push({ id, content });

  return res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => console.log("Listening on port 4001."));
