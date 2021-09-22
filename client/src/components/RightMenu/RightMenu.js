import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import ProfileCircleIcon from "../ProfileCircleIcon";

export default function RightMenu() {
  return (
    <aside className="right-menu">
      <ProfileCircleIcon />
      <div>
        <Link to="/">
          <img
            src="./assets/img/home.svg"
            className="right-menu-icon"
            alt="home"
          />
        </Link>
      </div>
      <div>
        <img
          src="./assets/img/search.svg"
          className="right-menu-icon"
          alt="search"
        />
      </div>
    </aside>
  );
}
