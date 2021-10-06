import React, { useEffect } from "react";
import "./styles.css";

//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { Col, Row } from "react-bootstrap";
import { isPlayBarDisplayed, isPlay } from "../../redux/trackData/actions";
import FavButton from "../FavButton";
import ThreeButtons from "../ThreeButtons";
import TrackImg from "../../components/TrackImg";

function Track({ dataTrack }) {
  const { trackObject } = useSelector((state) => state.trackReducer);

  const dispatch = useDispatch();

  function setReduxTrackData() {
    console.log(dataTrack);
    dispatch(trackObjectAction(dataTrack));
    dispatch(isPlayBarDisplayed(true));
    dispatch(isPlay(true));
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
