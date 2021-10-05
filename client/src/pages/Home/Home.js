//Imports
import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import sound from "./djtii.wav";
import sound2 from "./keina.wav";
import sound3 from "./keinaNigth.wav";

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
  const { isPlayBarDisplayed, trackObject } = useSelector(
    (state) => state.trackReducer,
  );

  const dataTrack = {
    id: "1",
    title: "Deltoya",
    author: "Robe",
    album: "Deltoya",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack: sound,
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2 min",
  };
  const dataTrack2 = {
    id: "2",
    title: "Deltoya2",
    author: "Robe2",
    album: "Deltoya2",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock2",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack: sound2,
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2 min",
  };
  const dataTrack3 = {
    id: "3",
    title: "Deltoya3",
    author: "Robe3",
    album: "Deltoya3",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack: sound3,
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2 min",
  };

  // track arrays mocks
  const topTracks = [dataTrack, dataTrack2, dataTrack3, dataTrack, dataTrack];

  let recomendedTracks = [];
  for (let i = 0; i < 14; i++) {
    recomendedTracks.push(dataTrack);
  }

  let lastUploadedTracks = [];
  for (let i = 0; i < 6; i++) {
    lastUploadedTracks.push(dataTrack);
  }
  function saveInQueue(e) {
    console.log(e.target.id);
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
                  return (
                    <Col xs={12} md={12} lg={12}>
                      <Track
                        id="hola"
                        onClick={saveInQueue}
                        dataTrack={track}
                      />
                    </Col>
                  );
                })}
              </div>
            </Col>
          </Row>
          <div className="xl-separator" />

          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {recomendedTracks.map((track) => {
                return (
                  <Col>
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
                <Col xs={4} md={4} lg={2}>
                  <BlockTrack dataTrack={track} size="big" />
                </Col>
              );
            })}
          </Row>
        </Container>
        {isPlayBarDisplayed && <PlayBar dataTrack={trackObject} />}
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Home));
