import useRequest from "../../hooks/use-request";
import Router from "next/router";
import { useEffect } from "react";

function SignOut() {
  const { execute } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    execute();
  }, []);

  return <h1>Signing you out...</h1>;
}

export default SignOut;
