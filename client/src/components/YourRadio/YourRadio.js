import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

function YourRadio() {
  return (
    <>
      <Row className="your-radio">
        <Col xs={4} md={4} lg={4} className="liked-icon-col">
          <FontAwesomeIcon
            icon={faBroadcastTower}
            className="liked-icon fa-3x"
          />
        </Col>
        <Col xs={8} md={8} lg={8} className="liked-info-col">
          <Row className="your-radio-go-info">Your Radio</Row>
        </Col>
      </Row>
    </>
  );
}

export default YourRadio;
