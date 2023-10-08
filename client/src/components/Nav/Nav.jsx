import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/form">
        <button>Create Videogame</button>
      </Link>
      <Link to="/">
        <button>Log Out</button>
      </Link>
    </div>
  );
}
