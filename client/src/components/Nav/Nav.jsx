import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import navImg from "./Nav.png";

export default function Nav() {
  const location = useLocation();
  const isHomeActive = location.pathname === "/home";
  const isFormActive = location.pathname === "/form";

  return (
    <div>
      <div className={styles.navContainer}>
        <div className={styles.navBarButtonHome}>
          <Link to="/home">
            <h1
              className={
                isHomeActive ? styles.navBarButtonActive : styles.navBarButton
              }
            >
              home
            </h1>
          </Link>
        </div>
        <div className={styles.navBarButtonForm}>
          <Link to="/form">
            <h1
              className={
                isFormActive ? styles.navBarButtonActive : styles.navBarButton
              }
            >
              create videogame
            </h1>
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
