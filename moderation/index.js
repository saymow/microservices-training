const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const getCommentStatus = (comment) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve(comment.content.includes("orange") ? "REJECTED" : "APPROVED"),
      5000
    );
  });
};

app.post("/events", async (req, res) => {
  const { type, payload } = req.body;

  if (type === "CREATED_COMMENT") {
    const { postId, comment } = payload;

    axios.post("http://localhost:4005/events", {
      type: "COMMENT_MODERATION",
      payload: {
        commentId: comment.id,
        status: await getCommentStatus(comment),
      },
    });
  }

  return res.sendStatus(200);
});

app.listen(4003, () => console.log("Listening on port 4003."));
