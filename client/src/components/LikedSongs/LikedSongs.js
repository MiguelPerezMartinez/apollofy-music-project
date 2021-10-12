import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles.css";
function LikedSongs() {
  return (
    <>
      <Link to="/favourite-tracks">
        <Row className="liked-songs">
          <Col xs={4} md={4} lg={4} className="liked-icon-col">
            <FontAwesomeIcon icon={faHeart} className="liked-icon fa-5x" />
          </Col>
          <Col xs={8} md={8} lg={8} className="liked-info-col">
            <Row className="liked-go-info">Liked Songs</Row>
          </Col>
        </Row>
      </Link>
    </>
  );
}

export default LikedSongs;
