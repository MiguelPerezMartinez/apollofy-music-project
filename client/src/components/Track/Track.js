import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { MoreHoriz, Favorite } from "@material-ui/icons";
import "./styles.css";

//import TrackReducer
import {
  isPlayBarDisplayedAction,
  isPlay,
  trackObjectAction,
  setemptyHistoryQueue,
} from "../../redux/trackData/actions";

//import dialogueHandlerReducer
import { showDialogue } from "../../redux/dialogueHandler/actions";

//Components
import TrackImg from "../../components/TrackImg";

import { likeHandlerRequest } from "../../services/api/apiTrack";

// import DialogueBox from "../DialogueBox";

function Track({ dataTrack }) {
  const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);
  const userData = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState({
    state: false,
    loaded: false,
  });

  useEffect(() => {
    if (dataTrack !== undefined) {
      const userIndex = dataTrack.totalLikes.indexOf(userData.userId);
      if (userIndex >= 0) setIsLiked({ state: true, loaded: true });
      else setIsLiked({ state: false, loaded: true });
    }
  }, []);

  function handlerLike() {
    setIsLiked({ ...isLiked, loaded: false });
    likeHandlerRequest(userData.userId, dataTrack._id)
      .then(() => {
        setIsLiked({ state: !isLiked.state, loaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  function openDialogue(e) {
    dispatch(showDialogue(dataTrack, { x: e.clientX, y: e.clientY }));
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
              {isLiked.loaded ? (
                <Favorite
                  className={isLiked.state ? "liked" : ""}
                  onClick={handlerLike}
                />
              ) : (
                <Favorite className="like-disabled" />
              )}
              <MoreHoriz onClick={openDialogue} />
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
