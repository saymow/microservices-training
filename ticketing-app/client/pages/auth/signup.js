import { useState } from "react";
import useRequest from "../../hooks/use-request";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { execute, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await execute();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors && <div className="m-2">{errors}</div>}
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
}

export default Signup;
