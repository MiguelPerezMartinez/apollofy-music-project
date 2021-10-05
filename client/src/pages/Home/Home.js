//Imports
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import Track from "../../components/Track";
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import BlockTrack from "../../components/BlockTrack";
import PlayBar from "../../components/PlayBar";

function Home() {
  const { isPlayBarDisplayed } = useSelector((state) => state.trackReducer);

  const dataTrack = {
    _id: "61547351faa5f860b59a6cda",
    title: "Deltoya",
    author: "Robe",
    album: "Deltoya",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack:
      "http://res.cloudinary.com/apollofy/video/upload/v1633098067/track/zgwakszoia30bwch8dpc.wav",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2:34",
  };

  // track arrays mocks

  let topTracks = [];
  for (let i = 0; i < 5; i++) {
    topTracks.push({ ...dataTrack, _id: dataTrack._id + `top${i}` });
  }

  let recomendedTracks = [];
  for (let i = 0; i < 14; i++) {
    recomendedTracks.push({
      ...dataTrack,
      _id: dataTrack._id + `recommended${i}`,
    });
  }

  let lastUploadedTracks = [];
  for (let i = 0; i < 6; i++) {
    lastUploadedTracks.push({
      ...dataTrack,
      _id: dataTrack._id + `lastUp${i}`,
    });
  }

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col xs={12} md={5} lg={5}>
              <div className="home-top-col">
                <h1>HOME</h1>
                <h2>Songs</h2>
                <h3>My plylist</h3>
              </div>
            </Col>
            <Col xs={12} md={7} lg={7}>
              <div className="home-top-col">
                {topTracks.map((track) => {
                  return <Track dataTrack={track} key={track._id} />;
                })}
              </div>
            </Col>
          </Row>
          <div className="xl-separator" />

          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {recomendedTracks.map((track) => {
                return (
                  <Col key={track._id}>
                    <BlockTrack dataTrack={track} size="small" />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>
          <div className="xl-separator" />

          <Row xs={4} md={4} lg={2}>
            {lastUploadedTracks.map((track) => {
              return (
                <Col xs={4} md={4} lg={2} key={track._id}>
                  <BlockTrack dataTrack={track} size="big" />
                </Col>
              );
            })}
          </Row>
        </Container>
        {isPlayBarDisplayed && <PlayBar dataTrack={dataTrack} />}
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Home));
