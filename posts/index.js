const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const posts = {};

const randomId = () => Math.random().toString("16");

app.use(cors());
app.use(express.json());

const getPostComments = async (postId) => {
  return axios
    .get(`http://localhost:4001/posts/${postId}/comments`)
    .then((res) => res.data);
};

app.get("/posts", async (req, res) => {
  for (const post of Object.values(posts)) {
    posts[post.id].comments = await getPostComments(post.id);
  }

  return res.send(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const post = { id: randomId(), title };

  posts[post.id] = post;

  axios.post("http://localhost:4005/events", {
    type: "CREATED_POST",
    payload: post,
  });

  return res.status(201).send(posts);
});

app.listen(4000, () => {
  console.log("Listening on port 4000.")
  console.log("Testing updating docker-kubectl img 2.0.")
});
