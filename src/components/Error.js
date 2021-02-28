import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="error">
      <h1>Error</h1>
      <Link to="/">
        <button className="btn error-btn">Back to Home</button>
      </Link>
    </div>
  );
}
