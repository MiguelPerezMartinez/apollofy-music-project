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
      <Col>
        <div className="track-row-img-container">
          <Image src={dataTrack.urlImage} fluid />
        </div>
      </Col>
      <Col>
        <div className="text-long-box">
          <p className="text-long-track">{dataTrack.title}</p>
        </div>
      </Col>
      <Col>
        <div className="text-long-box">
          <p className="text-long-track">{dataTrack.album}</p>
        </div>
      </Col>
      <Col>
        <div className="text-long-box">
          <p className="text-long-track">{dataTrack.author}</p>
        </div>
      </Col>
      <Col>
        <div className="text-long-box">
          <p className="text-long-track">{dataTrack.duration}</p>
        </div>
      </Col>
    </Row>
  );
}

export default Track;
