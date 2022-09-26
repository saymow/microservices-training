import React from "react";
import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
  console.log();

  return <h1>You are {!currentUser && "not"} signed in</h1>;
}

LandingPage.getInitialProps = async (ctx) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
