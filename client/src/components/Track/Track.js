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
  setPositionInHistory,
} from "../../redux/trackData/actions";
import FavButton from "../FavButton";

import TrackImg from "../../components/TrackImg";
import { setTrackHistoryInLocalStorage } from "../../services/localStorage";

function Track({ dataTrack }) {
  const { isPlayBarDisplayed } = useSelector(
    (state) => state.trackReducer,
  );

  const dispatch = useDispatch();

  function setReduxTrackData() {
    dispatch(trackObjectAction(dataTrack));
    dispatch(isPlayBarDisplayedAction(true));
    dispatch(isPlay(true));
    const historyLength = setTrackHistoryInLocalStorage(dataTrack);
    const resetedHistoryPosition = historyLength > 1 ? historyLength - 2 : 0;
    dispatch(setPositionInHistory(resetedHistoryPosition));
  }

  function addQueue() {
    localStorage.setItem("trackHistory", JSON.stringify());
  }

  if (dataTrack !== undefined) {
    return (
      <Row key={dataTrack._id} id={dataTrack._id} className="track-row">
        <Col xs={1} md={1} lg={1} onClick={setReduxTrackData}>
          <div className="track-row-img-container">
            <TrackImg urlCover={dataTrack.urlCover} />
          </div>
        </Col>
        <Col xs={5} md={5} lg={5}>
          <p className="track-title">{dataTrack.title}</p>
          <p className="track-author">{dataTrack.author}</p>
        </Col>
        <Col xs={3} md={3} lg={3} className="track-field-centered">
          <p>{dataTrack.album ? dataTrack.album : dataTrack.title}</p>
        </Col>
        <Col xs={3} md={3} lg={3}>
          <Row className="track-field-centered">
            <Col xs={6} md={6} lg={6} className="track-field-centered">
              <p>{dataTrack.duration}</p>
            </Col>
            <Col xs={6} md={6} lg={6} className="track-field-centered">
              <FavButton />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="track-row is-loading-component" />
      </>
    );
  }
}

export default Track;
