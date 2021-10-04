import React, { useEffect } from "react";
import "./styles.css";
//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import FavButton from "../FavButton";
import { Container } from "react-bootstrap";

import TrackImg from "../../components/TrackImg";

function Track({ dataTrack }) {
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
    <Row className="track-row" onClick={setReduxTrackData}>
      <Col xs={2} md={2} lg={2}>
        <div className="track-row-img-container">
          <TrackImg urlImage={dataTrack.urlImage} />
        </div>
      </Col>
      <Col xs={4} md={4} lg={4}>
        <p className="track-title">{dataTrack.title}</p>

        <p className="track-author">{dataTrack.author}</p>
      </Col>
      <Col>
        <div className="text-long-box">
          <p className="text-long-track">{dataTrack.album}</p>
        </div>
      </Col>
      <Col>
        <Row>
          <Col xs={6} md={6} lg={6}>
            <p className="">{dataTrack.duration}</p>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <FavButton />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Track;
