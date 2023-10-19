import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import navImg from "./Nav.png";

export default function Nav() {
  return (
    <div>
      <div className={styles.navContainer}>
        <div className={styles.navBarButtonHome}>
          <Link to="/home">
            <h1 className={styles.navBarButton}>home</h1>
          </Link>
        </div>
        <div className={styles.navBarButtonForm}>
          <Link to="/form">
            <h1 className={styles.navBarButton}>create videogame</h1>
          </Link>
        </div>
        <div className={styles.navBarButtonExit}>
          <Link to="/">
            <h1 className={styles.navBarButton}>exit</h1>
          </Link>
        </div>
      </div>
      <img src={navImg} className={styles.navBarImg} />
    </div>
  );
}
