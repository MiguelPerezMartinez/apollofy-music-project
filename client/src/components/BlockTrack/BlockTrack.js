import React from "react";
import "./styles.css";

import FavButton from "../FavButton";
import TrackImg from "../TrackImg";

import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlay } from "../../redux/trackData/actions";

import { Container, Row, Col } from "react-bootstrap";

function BlockTrack({ dataTrack, size = "small" }) {
  const track = useSelector((state) => state.trackReducer);
  const { trackObject } = track;
  const dispatch = useDispatch();

  function setReduxTrackData() {
    console.log(dataTrack);
    dispatch(trackObjectAction(dataTrack));
    dispatch(isPlayBarDisplayed(true));
    dispatch(isPlay(true));
  }

  if (dataTrack !== undefined) {
    return (
      <Container
        className={"blockTrack-background blockTrack-Container-" + size}
      >
        <Row className="blockTrack-img-container" onClick={setReduxTrackData}>
          <TrackImg urlCover={dataTrack.urlCover} />
        </Row>
        <Row className="name-TrackBlock">
          <Col xs={8}>
            <p className="blockTrack-title">{dataTrack.title}</p>
            <p className="blockTrack-author">{dataTrack.author}</p>
          </Col>
          <Col xs={3}>
            <FavButton />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <>
        <Container
          className={"blockTrack-Container-" + size + " is-loading-component"}
        />
      </>
    );
  }

  // return (
  //   <Container className={"blockTrack-background blockTrack-Container-" + size}>
  //     <Row className="blockTrack-img-container" onClick={setReduxTrackData}>
  //       <TrackImg urlCover={dataTrack.urlCover} />
  //     </Row>
  //     <Row className="name-TrackBlock">
  //       <Col xs={8}>
  //         <p className="blockTrack-title">{dataTrack.title}</p>
  //         <p className="blockTrack-author">{dataTrack.author}</p>
  //       </Col>
  //       <Col xs={3}>
  //         <FavButton />
  //       </Col>
  //     </Row>
  //   </Container>
  // );
}

export default BlockTrack;
