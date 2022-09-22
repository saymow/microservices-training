import { useState } from "react";
import axios from "axios";

function FieldErrors(props) {
  const { errors, field } = props;
  const fieldErrors = errors.filter((err) => err.field === field);

  if (!fieldErrors.length) return null;

  return (
    <ul class="alert alert-danger my-1">
      {fieldErrors.map((fieldError) => (
        <li key={fieldError.message}>{fieldError.message}</li>
      ))}
    </ul>
  );
}

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
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
        <FieldErrors errors={errors} field={"email"} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FieldErrors errors={errors} field={"password"} />
      </div>
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
}

export default Signup;
