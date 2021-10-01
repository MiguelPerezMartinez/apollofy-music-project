//Imports
import React, { useEffect } from "react";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import Track from "../../components/Track";
import TrackBox from "../../components/TrackBox";
import PlayButton from "../../components/PlayButton";
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";

//imports to set userRedux
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../services/api/index";
import { setUser } from "../../redux/userData/actions";

function Home() {
  const dispatch = useDispatch();
  const trackReducer = useSelector((stete) => stete.trackReducer);
  const { isPlayBarDisplayed } = trackReducer;
  // set data in userReducer
  useEffect(() => {
    getCurrentUser().then((response) => {
      dispatch(
        setUser({
          user_id: response._id,
          username: response.username,
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

  const topTracks = [1, 2, 3, 4, 5];
  const tracks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const recomendedTracks = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <div className="home-top-col">
                <h1>HOME</h1>
                <h2>Songs</h2>
                <h3>My plylist</h3>
              </div>
            </Col>
            <Col xs={12} md={6} lg={6}>
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
              {tracks.map((trackNum) => {
                return (
                  <Col>
                    <TrackBox trackNum={trackNum} />
                  </Col>
                );
              })}
            </Row>
          </ScrollContainer>
          <div className="xl-separator" />

          <Row xs={4} md={4} lg={2}>
            {recomendedTracks.map(() => {
              return (
                <Col xs={4} md={4} lg={2}>
                  <TrackBox size="big" />
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
