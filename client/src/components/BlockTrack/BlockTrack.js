import React, { useEffect, useState } from "react";
import "./styles.css";
import FavButton from "../FavButton";

import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";

import { Container, Row, Col } from "react-bootstrap";

function BlockTrack({ dataTrack }) {
  const track = useSelector((state) => state.trackReducer);
  const { trackObject } = track;

  const dispatch = useDispatch();

  function setReduxTrackData() {
    console.log(dataTrack);
    dispatch(trackObjectAction(dataTrack));
  }
  useEffect(() => {
    dispatch(isPlayBarDisplayed(true));
    dispatch(isPlaying(true));
  }, [trackObject]);
  return (
    <Container>
      <div className="blockTrack-Container">
        <Row className="blockTrack-img" onClick={setReduxTrackData}>
          <img
            className="image-track-block"
            src={dataTrack.urlImage}
            alt="songpicture"
          ></img>
        </Row>
        <Row className="name-TrackBlock">
          <Col xs={9}>
            <p className="text-long-track">{dataTrack.title}</p>
          </Col>
          <Col xs={3}>
            <FavButton />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default BlockTrack;
