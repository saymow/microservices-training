const express = require("express");
const cors = require("cors");

const app = express();
const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, payload } = req.body;

  if (type === "CREATED_POST") {
    const { id, title } = payload;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CREATED_COMMENT") {
    const { postId, comment } = payload;

    posts[postId].comments.push(comment);
  }

  if (type === "UPDATED_COMMENT") {
    const { postId, comment } = payload;

    const commentIdx = posts[postId].comments.findIndex(
      (__comment) => __comment.id === comment.id
    );

    posts[postId].comments.splice(commentIdx, 1, comment);
  }

  console.log(posts);

  return res.status(201).send(posts);
});

app.listen(4002, () => console.log("Listening on port 4002."));
