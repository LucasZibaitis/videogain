import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(props) {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/home">
        <button>LOG IN</button>
      </Link>
    </div>
  );
}
