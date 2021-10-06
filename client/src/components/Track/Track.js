import React, { useEffect } from "react";
import "./styles.css";

//import TrackReducer
import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "react-bootstrap";
import {
  isPlayBarDisplayedAction,
  isPlay,
  trackObjectAction,
  setemptyHistoryQueue,
} from "../../redux/trackData/actions";
import FavButton from "../FavButton";

import TrackImg from "../../components/TrackImg";

function Track({ dataTrack }) {
  const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);

  const dispatch = useDispatch();

  function setReduxTrackData() {
    dispatch(trackObjectAction(dataTrack));
    dispatch(isPlayBarDisplayedAction(true));
    dispatch(isPlay(true));

    let existingQueue = JSON.parse(localStorage.getItem("trackHistory"));
    console.log(existingQueue);
    if (existingQueue === null) {
      existingQueue = [];
    }

    existingQueue.push(dataTrack);

    localStorage.setItem("trackHistory", JSON.stringify(existingQueue));

    dispatch(setemptyHistoryQueue(true));
  }

  function addQueue() {
    localStorage.setItem("trackHistory", JSON.stringify());
  }

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
        <button onClick={addQueue}>queue</button>
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
