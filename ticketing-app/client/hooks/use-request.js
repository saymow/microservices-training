import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  async function execute() {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      onSuccess?.(response.data);
    } catch (err) {
      console.error(err);
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { execute, errors };
};

export default useRequest;
