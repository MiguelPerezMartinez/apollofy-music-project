import React from "react";
import { Link } from "react-router-dom";

import { logOut } from "../../services/firebase";

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
            alt="home"
            className="right-menu-icon"
          />
        </Link>
      </div>
      <div>
        <img
          src="./assets/img/search.svg"
          alt="search"
          className="right-menu-icon"
        />
      </div>
      <div>
        <img
          src="./assets/img/logout.svg"
          alt="logout"
          className="right-menu-icon"
          onClick={logOut}
        />
      </div>
    </aside>
  );
}
