//Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import Track from "../../components/Track";
import TrackBox from "../../components/TrackBox";
import PlayButton from "../../components/PlayButton";
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import BlockTrack from "../../components/BlockTrack";

//imports to set userRedux
import { getCurrentUser } from "../../services/api/index";
import { setUser } from "../../redux/userData/actions";

function Home() {
  const dispatch = useDispatch();
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlayBarDisplayed } = trackReducer;

  // set data in userReducer
  useEffect(() => {
    getCurrentUser().then((response) => {
      dispatch(
        setUser({
          user_id: response._id,
          username: response.username,
          profileImg: response.profileImg,
        }),
      );
    });
  }, []);

  const dataTrack = {
    title: "Deltoya",
    author: "Robe",
    album: "Deltoya",
    releaseYear: "15 de juny de 1992",
    genre: "Transgressive rock",
    urlImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/extremoduro-robe-iniesta-separacion-1576666810.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
    urlTrack: "res",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "2 min",
  };

  // track arrays mocks
  const topTracks = [dataTrack, dataTrack, dataTrack, dataTrack, dataTrack];

  let recomendedTracks = [];
  for (let i = 0; i < 14; i++) {
    recomendedTracks.push(dataTrack);
  }

  let lastUploadedTracks = [];
  for (let i = 0; i < 6; i++) {
    lastUploadedTracks.push(dataTrack);
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
                {topTracks.map(() => {
                  return (
                    <Col xs={12} md={12} lg={12}>
                      <Track dataTrack={dataTrack} />
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

          {isPlayBarDisplayed && <PlayButton />}
        </Container>
      </main>
    </>
  );
}

export default withAuth(BarsAndModal(Home));
