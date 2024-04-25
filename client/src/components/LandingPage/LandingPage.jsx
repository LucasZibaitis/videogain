import React from "react";
import { Link } from "react-router-dom";
import LandingLogo1 from "../LandingPage/LandingPageLogo1.png";
import LandingLogo2 from "../LandingPage/LandingPageLogo2.png";
import MediaQuery from "react-responsive";

import styles from "./LandingPage.module.css";

export default function LandingPage(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div class="">
      <Link to="/home">
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <MediaQuery maxWidth={600}>
            <img className={styles.Logo} src={LandingLogo2} width={350} />
          </MediaQuery>
          <MediaQuery minWidth={601}>
            <img
              className={styles.Logo}
              src={isHovered ? LandingLogo2 : LandingLogo1}
              width={600}
            />
          </MediaQuery>
        </div>
      </Link>
    </div>
  );
}
