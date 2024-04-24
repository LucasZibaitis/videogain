import React from "react";
import { Link, useLocation } from "react-router-dom";
import navImg from "./Nav.png";

export default function Nav() {
  const location = useLocation();

  return (
    <div class="h-36 mb-10">
      <div class="relative">
        <img src={navImg} />
      </div>
      <div class="text-white font-light text-4xl flex justify-center items-center gap-20 w-[1220px] h-36 absolute right-36 top-10">
        <div>
          <Link to="/home">
            <h1
              class={`${
                location.pathname === "/home" ? "text-[#3c4999]" : null
              } hover:text-[#3c4999] transition-all duration-300`}
            >
              home
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/form">
            <h1
              class={`${
                location.pathname === "/form" ? "text-[#3c4999]" : null
              } hover:text-[#3c4999] transition-all duration-300`}
            >
              create videogame
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/">
            <h1 class="hover:text-[#3c4999] transition-all duration-300">
              exit
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
