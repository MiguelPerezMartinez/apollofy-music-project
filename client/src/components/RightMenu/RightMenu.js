import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import { logOut } from "../../services/firebase";

//Components
import { Row, Col } from "react-bootstrap";

import ProfileCircleIcon from "../ProfileCircleIcon";

//user from userReducer
import { useSelector } from "react-redux";

export default function RightMenu({ handleOpenModal }) {
  const { username } = useSelector((state) => state.userReducer.data);
  const w = window.innerWidth;
  if (w <= 400) {
    return (
      <aside className="mobile-bottom-menu">
        <Row>
          <Col className="mobile-bottom-menu-button">
            <Link to="/">Home</Link>
          </Col>
          <Col className="mobile-bottom-menu-button">Search</Col>
          <Col
            className="mobile-bottom-menu-button"
            onClick={() => {
              handleOpenModal();
            }}
          >
            <img
              src="./assets/img/upload.svg"
              alt="logout"
              className="right-menu-icon"
            />
          </Col>
          <Col className="mobile-bottom-menu-button">
            <Link to="/profile" className="right-menu-row">
              <ProfileCircleIcon />
            </Link>
          </Col>
        </Row>
      </aside>
    );
  } else {
    return (
      <aside className="right-menu">
        <div>
          <Link to="/profile" className="right-menu-row">
            <ProfileCircleIcon />
            <div className="right-menu-row-title">Welcome {username}</div>
          </Link>
        </div>
        <div>
          <div className="right-menu-row no-hover">
            <img
              src="./assets/img/search.svg"
              alt="search"
              className="right-menu-icon"
            />
            <div className="right-menu-row-title">
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div>
          <Link to="/" className="right-menu-row">
            <img
              src="./assets/img/home.svg"
              alt="home"
              className="right-menu-icon"
            />
            <div className="right-menu-row-title">Home</div>
          </Link>
        </div>
        <div onClick={logOut}>
          <div className="right-menu-row">
            <img
              src="./assets/img/logout.svg"
              alt="logout"
              className="right-menu-icon"
            />
            <div className="right-menu-row-title">Logout</div>
          </div>
        </div>
        <div
          onClick={() => {
            handleOpenModal();
          }}
        >
          <div className="right-menu-row">
            <img
              src="./assets/img/upload.svg"
              alt="logout"
              className="right-menu-icon"
            />
            <div className="right-menu-row-title">Upload</div>
          </div>
        </div>
      </aside>
    );
  }
}
