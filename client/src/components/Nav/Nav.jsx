import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import navImg from "./Nav.png";

export default function Nav() {
  return (
    <div>
      <img src={navImg} className={styles.navBarImg} />
      <Link to="/home">
        <p className={styles.navBarButtonHome}>home</p>
      </Link>
      <Link to="/form">
        <p className={styles.navBarButtonForm}>create videogame</p>
      </Link>
      <Link to="/">
        <p className={styles.navBarButtonExit}>exit</p>
      </Link>
    </div>
  );
}
