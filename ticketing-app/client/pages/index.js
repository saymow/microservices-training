import axios from "axios";
import React from "react";
import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
  console.log(currentUser);

  return <h1>Landing Page 5</h1>;
}

LandingPage.getInitialProps = async (ctx) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
