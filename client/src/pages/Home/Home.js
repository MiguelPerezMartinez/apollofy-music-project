//Imports
import React, { useState, useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import {
  faPlayCircle,
  faHeart,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";

//Reducer imports
import { reloadFetchAction } from "../../redux/trackData/actions";
import { reloadPlaylistFetchAction } from "../../redux/playlistData/actions";

//Fetch requests
import {
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
  getMostLikedPlaylists,
} from "../../services/api/index";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

//Components
import { Container, Row, Col } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import Track from "../../components/Track";
import BlockTrack from "../../components/BlockTrack";
import BlockPlaylist from "../../components/BlockPlaylist";
import LinkCards from "../../components/LinkCards";

function Home() {
  //Redux state vars
  const dispatch = useDispatch();
  const { reloadFetch } = useSelector((state) => state.trackReducer);
  const { reloadPlaylistFetch } = useSelector((state) => state.playlistReducer);

  //State vars
  const [lastUploadedTracks, setlastUploadedTracks] = useState([]);
  const [trashTracks, setTrashTracks] = useState([]);
  const [pachangaTracks, setPachangaTracks] = useState([]);
  const [mostPlayedTracks, setMostPlayedTracks] = useState([]);
  const [mostLikedTracks, setMostLikedTracks] = useState([]);

  const [mostLikedPlaylists, setMostLikedPlaylists] = useState([]);

  // const [tracksLoaded, setTracksLoaded] = useState(false);

  useEffect(() => {
    if (reloadFetch) {
      // Load last uploaded tracks
      getAllTracks().then((response) => {
        setlastUploadedTracks(response.data.tracks.slice(0, 6));
        setTrashTracks(response.data.tracks.slice(6, 20));
        setPachangaTracks(response.data.tracks.slice(17, -1));
      });

      // Load most played tracks
      getMostPlayedTracks().then((response) => {
        setMostPlayedTracks(response.data.tracks.slice(0, 5));
      });

      // Load most liked tracks
      getMostLikedTracks().then((response) => {
        setMostLikedTracks(response.data.tracks);
      });
      dispatch(reloadFetchAction(false));
    }
    // eslint-disable-next-line
  }, [reloadFetch]);

  useEffect(() => {
    if (reloadPlaylistFetch) {
      //Load most liked playlists
      getMostLikedPlaylists().then((response) => {
        setMostLikedPlaylists(response.data.playlists);
      });
    }
  }, [reloadPlaylistFetch]);

  useEffect(() => {
    return () => {
      dispatch(reloadFetchAction(true));
      dispatch(reloadPlaylistFetchAction(true));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col sm xs={12} md={12} lg={5}>
              <div className="home-top-col-targets">
                <Row>
                  <Col xs={12}>
                    <LinkCards
                      name="Favourite Songs"
                      icon={faHeart}
                      to="/favourite-tracks"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={6}>
                    <LinkCards
                      name="Favourite Playlist"
                      icon={faPlayCircle}
                      to="/favourite-playlists"
                    />
                  </Col>
                  <Col xs={12} md={12} lg={6}>
                    <LinkCards
                      name="Your Radio"
                      icon={faBroadcastTower}
                      to=""
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm xs={12} md={12} lg={7}>
              <h1>Trending:</h1>
              <div className="home-top-col">
                {mostPlayedTracks.map((track, index) => {
                  return (
                    <Track dataTrack={track} key={track ? track._id : index} />
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>

        <div className="xl-separator" />

        <Container>
          <h1>Recommended Tracks:</h1>
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
          <h1>Last Uploaded Tracks:</h1>
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
          <h1>Popular playlists:</h1>
          <Row sm xs={4} md={4} lg={2}>
            {mostLikedPlaylists.map((playlist, index) => {
              return (
                <Col
                  sm
                  xs={2}
                  md={4}
                  lg={2}
                  key={playlist ? playlist._id : index}
                >
                  <BlockPlaylist playlistData={playlist} size="big" />
                </Col>
              );
            })}
          </Row>
        </Container>

        <div className="xl-separator" />

        <Container>
          <h1>Pachanga selection for you:</h1>
          <ScrollContainer className="scroll-container">
            <Row className="scroll-wrapper-tracks">
              {pachangaTracks.map((track, index) => {
                return (
                  <Col key={track ? track._id : index}>
                    <BlockTrack playlistData={track} size="small" />
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
