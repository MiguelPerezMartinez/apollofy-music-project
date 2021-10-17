import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoreVert, Favorite } from "@material-ui/icons";
import "./styles.css";

import TrackImg from "../TrackImg";

import { useDispatch, useSelector } from "react-redux";
import {
  // isPlayBarDisplayedAction,
  // setPositionInHistory,
  reloadPlaylistFetchAction,
  playlistObjectAction,
} from "../../redux/playlistData/actions";

// import { resetPositionInHistory } from "../../services/localStorage";

//import dialogueHandlerReducer
import { showDialogue } from "../../redux/dialogueHandler/actions";

// import { likeHandlerRequest } from "../../services/api/apiTrack";

import { Container, Row, Col } from "react-bootstrap";

function BlockPlaylist({ playlistData, size = "small" }) {
  const userData = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState({
    state: false,
    loaded: false,
  });

  useEffect(() => {
    if (playlistData !== undefined) {
      const userIndex = playlistData.totalLikes.indexOf(userData.userId);
      if (userIndex >= 0) setIsLiked({ state: true, loaded: true });
      else setIsLiked({ state: false, loaded: true });
    }
    // eslint-disable-next-line
  }, []);

  // function handlerLike() {
  //   setIsLiked({ ...isLiked, loaded: false });
  //   likeHandlerRequest(userData.userId, playlistData._id)
  //     .then(() => {
  //       setIsLiked({ state: !isLiked.state, loaded: true });
  //       dispatch(reloadPlaylistFetchAction(true));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function setReduxPlaylistData() {
    dispatch(playlistObjectAction(playlistData));
    // dispatch(isPlayBarDisplayedAction(true));

    // const resetedHistoryPosition = resetPositionInHistory();
    // dispatch(setPositionInHistory(resetedHistoryPosition));
  }

  // function openDialogue(e) {
  //   dispatch(showDialogue(playlistData, { x: e.clientX, y: e.clientY }));
  // }

  if (playlistData !== undefined) {
    return (
      <Container
        className={"block-playlist-background block-playlist-container-" + size}
      >
        <Row
          className="block-playlist-img-container"
          onClick={setReduxPlaylistData}
        >
          <TrackImg urlCover={playlistData.tracks[0].urlCover} />
        </Row>
        <Row className="name-TrackBlock">
          <Col xs={8}>
            <p className="block-playlist-title">
              <Link to={`/playlist-view/${playlistData._id}`}>
                {" "}
                {playlistData.title}{" "}
              </Link>
            </p>
            <p className="block-playlist-description">{playlistData.description}</p>
          </Col>
          <Col xs={3}>
            {/* {isLiked.loaded ? (
              <Favorite
                className={isLiked.state ? "liked" : ""}
                // onClick={handlerLike}
              />
            ) : (
              <Favorite className="like-disabled" />
            )} */}
            <MoreVert />
            {/* <MoreVert onClick={openDialogue} /> */}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <>
        <Container
          className={"block-playlist-container-" + size + " is-loading-component"}
        />
      </>
    );
  }
}

export default BlockPlaylist;
