import axios from "axios";

const makeAxiosConfig = (req) =>
  typeof window === "undefined"
    ? {
        baseURL:
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers,
      }
    : {
        baseURL: "/",
      };

export default ({ req }) => {
  return axios.create(makeAxiosConfig(req));
};
