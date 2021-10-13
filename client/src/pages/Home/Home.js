//Imports
import React, { useState, useEffect } from "react";
import "./styles.css";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

import {
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
} from "../../services/api/index";

//Components
import Track from "../../components/Track";
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import BlockTrack from "../../components/BlockTrack";
import LinkCards from "../../components/LinkCards";

function Home() {
  const [lastUploadedTracks, setlastUploadedTracks] = useState([]);
  const [trashTracks, setTrashTracks] = useState([]);
  const [pachangaTracks, setPachangaTracks] = useState([]);
  const [mostPlayedTracks, setMostPlayedTracks] = useState([]);
  const [mostLikedTracks, setMostLikedTracks] = useState([]);
  // const [tracksLoaded, setTracksLoaded] = useState(false);

  useEffect(() => {
    // Load last uploaded tracks
    getAllTracks().then((response) => {
      setlastUploadedTracks(response.data.tracks.slice(0, 6));
      setTrashTracks(response.data.tracks.slice(6, 20));
      setPachangaTracks(response.data.tracks.slice(17, -1));
    });

    // Load most played tracks
    getMostPlayedTracks().then((response) => {
      setMostPlayedTracks(response.data.tracks);
    });

    // Load most liked tracks
    getMostLikedTracks().then((response) => {
      setMostLikedTracks(response.data.tracks);
    });
  }, []);

  // track arrays mocks
  // let topTracks = [];
  // for (let i = 0; i < 5; i++) {
  //   topTracks.push(allTracks[i]);
  // }

  // let RecommendedTracks = [];
  // for (let i = 0; i < 14; i++) {
  //   RecommendedTracks.push(allTracks[i + 5]);
  // }

  // let lastUploadedTracks = [];
  // for (let i = 0; i < 6; i++) {
  //   lastUploadedTracks.push(allTracks[i + 19]);
  // }

  function saveInQueue(e) {
    console.log(e.target.key);
  }
  return (
    <>
      <main>
        <Container>
          <Row>
            <Col sm xs={12} md={12} lg={5}>
              <div className="home-top-col-targets">
                <Row>
                  <Col xs={12}>
                    <LinkCards name="Like Songs" icon={faHeart} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={6}>
                    <LinkCards name="Favourite Playlist" icon={faPlayCircle} />
                  </Col>
                  <Col xs={12} md={12} lg={6}>
                    <LinkCards name="Your Radio" icon={faBroadcastTower} />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm xs={12} md={12} lg={7}>
              <h1>Trending:</h1>
              <div className="home-top-col">
                {mostPlayedTracks.map((track, index) => {
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
              {mostLikedTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>
        </Container>

        <div className="xl-separator" />

        <Container>
          <h1>Last Uploaded:</h1>
          <Row sm xs={4} md={4} lg={2}>
            {lastUploadedTracks.map((track, index) => {
              return (
                <Col sm xs={2} md={4} lg={2} key={track ? track._id : index}>
                  <BlockTrack dataTrack={track} size="big" />
                </Col>
              );
            })}
          </Row>
        </Container>

        <div className="xl-separator" />

        <Container>
          <h1>Trash Tracks:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {trashTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>
        </Container>

        <div className="xl-separator" />

        <Container>
          <h1>Pachanga selection for you:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {pachangaTracks.map((track, index) => {
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
