const express = require("express");
const axios = require("axios");
const cors = require("cors");

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
  const comment = { id: randomId(), content };

  if (!(postId in commentsByPostId)) {
    commentsByPostId[postId] = [];
  }

  commentsByPostId[postId].push(comment);

  axios.post("http://localhost:4005/events", {
    type: "CREATED_COMMENT",
    payload: { postId, comment },
  });

  return res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => console.log("Listening on port 4001."));
