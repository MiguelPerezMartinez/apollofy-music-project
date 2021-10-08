import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { MoreHoriz } from "@material-ui/icons";
import "./styles.css";

//import TrackReducer
import {
  isPlayBarDisplayedAction,
  isPlay,
  trackObjectAction,
  setemptyHistoryQueue,
  setPositionInHistory,
} from "../../redux/trackData/actions";

//import dialogueHandlerReducer
import { showDialogue } from "../../redux/dialogueHandler/actions";

//Components
import FavButton from "../FavButton";
import TrackImg from "../../components/TrackImg";
import { resetPositionInHistory } from "../../services/localStorage";

// import DialogueBox from "../DialogueBox";

function Track({ dataTrack }) {
  const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);
  const dispatch = useDispatch();

  function setReduxTrackData() {
    dispatch(trackObjectAction(dataTrack));
    dispatch(isPlayBarDisplayedAction(true));
    dispatch(isPlay(true));

    const resetedHistoryPosition = resetPositionInHistory();
    dispatch(setPositionInHistory(resetedHistoryPosition));
  }

  function openDialogue(e) {
    dispatch(showDialogue(dataTrack, { x: e.clientX, y: e.clientY }));
  }

  if (dataTrack !== undefined) {
    return (
      <Row key={dataTrack._id} id={dataTrack._id} className="track-row">
        <Col xs={12}>
          <Row>
            <Col xs={2} md={2} lg={2} onClick={setReduxTrackData}>
              <div className="track-row-img-container">
                <TrackImg urlCover={dataTrack.urlCover} />
              </div>
            </Col>
            <Col xs={5} md={5} lg={5}>
              <p className="track-title">{dataTrack.title}</p>
              <p className="track-author">{dataTrack.author}</p>
            </Col>
            <Col
              md={2}
              lg={2}
              className="d-none d-md-block d-lg-block track-field-centered track-album"
            >
              <p>{dataTrack.album ? dataTrack.album : dataTrack.title}</p>
            </Col>
            <Col xs={4} md={3} lg={3} className=" track-field-centered">
              <Row>
                <Col xs={4} md={4} lg={4}>
                  <p>{dataTrack.duration}</p>
                </Col>
                <Col xs={4} md={4} lg={4}>
                  <FavButton />
                </Col>
                <Col xs={4} md={4} lg={4}>
                  <MoreHoriz onClick={openDialogue} />
                </Col>
              </Row>
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
