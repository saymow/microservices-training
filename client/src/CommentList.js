import React from "react";

const getCommentText = (comment) => {
  if (comment.status === "PENDING") {
    return "This comment is awaiting moderation.";
  }
  if (comment.status === "REJECTED") {
    return "This comment was rejected.";
  }

  return comment.content;
};

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{getCommentText(comment)}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
