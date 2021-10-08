//Imports
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

import { getAllTracks } from "../../services/api/index";

//Components
import Track from "../../components/Track";
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import BlockTrack from "../../components/BlockTrack";

function Home() {
  const [allTracks, setAlltracks] = useState([]);
  // const [tracksLoaded, setTracksLoaded] = useState(false);
  useEffect(() => {
    getAllTracks().then((response) => {
      setAlltracks(response.data.tracks);
      // setTracksLoaded(true);
    });
  }, []);

  // track arrays mocks

  let topTracks = [];
  for (let i = 0; i < 5; i++) {
    topTracks.push(allTracks[i]);
  }

  let RecommendedTracks = [];
  for (let i = 0; i < 14; i++) {
    RecommendedTracks.push(allTracks[i + 5]);
  }

  let lastUploadedTracks = [];
  for (let i = 0; i < 6; i++) {
    lastUploadedTracks.push(allTracks[i + 19]);
  }
  function saveInQueue(e) {
    console.log(e.target.key);
  }
  return (
    <>
      <main>
        <Container>
          <Row>
            <Col sm xs={12} md={12} lg={5}>
              <div className="home-top-col">
                <h1>HOME</h1>
                <h3>My plylist</h3>
                <Link to="/history-tracks">
                  <h3>Go to History</h3>
                </Link>
              </div>
            </Col>
            <Col sm xs={12} md={12} lg={7}>
              <div className="home-top-col">
                {topTracks.map((track, index) => {
                  return (
                    <Track
                      onClick={saveInQueue}
                      dataTrack={track}
                      key={track ? track._id : index}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
        <div className="xl-separator" />
        <Container>
          <h1>Recommended for you:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {RecommendedTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>

          <div className="xl-separator" />

          <h1>Last uploaded:</h1>
          <Row sm xs={4} md={4} lg={2}>
            {lastUploadedTracks.map((track, index) => {
              return (
                <Col sm xs={2} md={4} lg={2} key={track ? track._id : index}>
                  <BlockTrack dataTrack={track} size="big" />
                </Col>
              );
            })}
          </Row>

          <div className="xl-separator" />

          <h1>Recommended for you:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {RecommendedTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>

          <div className="xl-separator" />

          <h1>Recommended for you:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {RecommendedTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>
        </Container>
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Home));
