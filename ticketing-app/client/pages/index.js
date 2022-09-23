import axios from "axios";
import React from "react";

function LandingPage({ currentUser }) {
  console.log(currentUser);

  return <h1>Landing Page 5</h1>;
}

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
};

export default LandingPage;
