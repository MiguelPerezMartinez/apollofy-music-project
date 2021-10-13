import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles.css";

function FavPlaylist() {
  return (
    <>
      <Link to="/favourite-playlists">
        <Row className="liked-playlist">
          <Col xs={4} md={4} lg={4} className="liked-icon-col">
            <FontAwesomeIcon icon={faPlayCircle} className="liked-icon fa-3x" />
          </Col>
          <Col xs={8} md={8} lg={8} className="liked-info-col">
            <Row className="fav-playlist-go-info">Favourite Playlists</Row>
          </Col>
        </Row>
      </Link>
    </>
  );
}

export default FavPlaylist;
