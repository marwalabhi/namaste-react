import { useRouteError } from "react-router-dom";
import "../Error/Error.css";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="e-error-container">
      <h1>Oops!</h1>
      <div className="e-err-msg-wrong">Something went wrong!</div>
      <h3>
        {err.status}: {err.statusText}
      </h3>
      <h5>{err.data}</h5>
    </div>
  );
};

export default Error;
