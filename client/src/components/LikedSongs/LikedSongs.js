import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
function LikedSongs() {
  return (
    <>
      <Row className="liked-songs">
        <Col xs={4} md={4} lg={4} className="liked-icon-col">
          <FontAwesomeIcon icon={faHeart} className="liked-icon fa-5x" />
        </Col>
        <Col xs={8} md={8} lg={8} className="liked-info-col">
          <Row className="liked-go-list">
            <FontAwesomeIcon icon={faPlayCircle} className="liked-icon fa-4x" />
          </Row>

          <Row className="liked-go-info">Favourite Songs</Row>
        </Col>
      </Row>
    </>
  );
}

export default LikedSongs;
