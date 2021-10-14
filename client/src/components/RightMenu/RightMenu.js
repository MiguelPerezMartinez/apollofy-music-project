import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import "./styles.css";

import { logOut } from "../../services/firebase";
import { setSearchQuery } from "../../redux/searchHandler/actions";

//Components
import { Row, Col } from "react-bootstrap";

//Icons
import { HomeOutlined, CloudUpload, SearchOutlined } from "@material-ui/icons";

import ProfileCircleIcon from "../ProfileCircleIcon";
import Input from "../../components/Input";

export default function RightMenu({ handleOpenModal, handleCloseModal }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { username, profileImg } = useSelector(
    (state) => state.userReducer.data,
  );
  const { query } = useSelector((state) => state.searchHandler);
  const dispatch = useDispatch();

  let location = useLocation();

  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(query);
    if (location.pathname !== "/search") {
      setIsSearchSubmitted(true);
    }
  }

  return isSearchSubmitted ? (
    <Redirect to="/search" />
  ) : (
    <aside className="right-menu">
      <div>
        <Link to="/profile" className="right-menu-row">
          <ProfileCircleIcon profileImg={profileImg} />
          <div className="right-menu-row-title">Welcome {username}</div>
        </Link>
      </div>

      <div
        onClick={() => {
          isUploadModalOpen
            ? handleCloseModal() && setIsUploadModalOpen(false)
            : handleOpenModal() && setIsUploadModalOpen(true);
        }}
      >
        <div className="right-menu-row">
          <CloudUpload fontSize="large" />
          <div className="right-menu-row-title">Upload song</div>
        </div>
      </div>
      <div className="xl-separator" />
      <div>
        <div className="right-menu-row no-hover">
          <SearchOutlined fontSize="large" />
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="searchQuery"
              label=""
              value={query}
              placeholder="Type your search"
              handleChange={handleChange}
            />
          </form>
        </div>
      </div>
      <div>
        <Link to="/" className="right-menu-row">
          <HomeOutlined fontSize="large" />
          <div className="right-menu-row-title">Home</div>
        </Link>
      </div>
      <div onClick={logOut} className="right-menu-logout">
        <div className="right-menu-row">
          <img
            src="./assets/img/logout.svg"
            alt="logout"
            className="right-menu-icon"
          />
          <div className="right-menu-row-title">Logout</div>
        </div>
      </div>
    </aside>
  );
}
