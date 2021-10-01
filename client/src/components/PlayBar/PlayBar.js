import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlay } from "../../redux/trackData/actions";
import WaveSound from "../WaveSound";
import "./styles.css";

//Components
import { Row, Col } from "react-bootstrap";
// import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";

function PlayBar({ dataTrack }) {
  //Redux vars
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlaying, waveSurfer } = trackReducer;
  const dispatch = useDispatch();

  //State vars
  const [isMute, setMute] = useState(false);
  const [isPlayPause, setPlayPause] = useState(true);
  const [isChromeCast, setChromecast] = useState(false);
  //   console.log(dataTrack);

  function playPause() {
    waveSurfer.playPause();
    if (isPlaying) {
      setPlayPause(false);
      dispatch(isPlay(false));
    } else {
      setPlayPause(true);
      dispatch(isPlay(true));
    }
  }

  function goPreviousTrack() {
    console.log("go previous track");
  }

  function goNextTrack() {
    console.log("go next track");
  }

  function isItMute() {
    if (isMute) {
      setMute(false);
    } else {
      setMute(true);
    }
  }

  function isChromeCastOn() {
    if (isChromeCast) {
      console.log("Chromecast is off");
      setChromecast(false);
    } else {
      console.log("Chromecast is on");
      setChromecast(true);
    }
  }

  //update on icons change
  useEffect(() => {}, [isPlayPause, isMute, isChromeCast]);

  return (
    <>
      <div className="main-playbar-container">
        {/* <Row>
          <Col>
            <img src={dataTrack.urlImage} alt="thumbnail" className="" />
          </Col>
          <Col>
            <Row>Track name</Row>
            <Row>Author - Album</Row>
          </Col>
          <Col>
            <div>
              <img src="" alt="previous track btn" className="" />
            </div>
            {isPlaying ? (
              <div onClick={isItPlaying}>
                <img src="" alt="play btn" className="" />
              </div>
            ) : (
              <div onClick={isItPlaying}>
                <img src="" alt="pause btn" className="" />
              </div>
            )}
            <div>
              <img src="" alt="next track btn" className="" />
            </div>
          </Col>
          <Col>Song progress bar/equalizer</Col>
          <Col>show progress time and total time</Col>
          <Col>
            {!isMute ? (
              <div onClick={isItMute} className="">
                <img src="" alt="speaker on icon" className="" />
              </div>
            ) : (
              <div onClick={isItMute} className="">
                <img src="" alt="speaker off icon" className="" />
              </div>
            )}
          </Col>
          <Col>volume bar</Col>
          <Col>
            {!isChromeCast ? (
              <div onClick={isChromeCastOn} className="">
                <img src="" alt="chromecast off icon" className="" />
              </div>
            ) : (
              <div onClick={isChromeCastOn}>
                <img src="" alt="chromecast on icon" className="" />
              </div>
            )}
          </Col>
        </Row> */}
        <Row>
          <Col lg={2}>
            <Row>
              <Col>
                <img
                  src={dataTrack.urlImage}
                  alt="thumbnail"
                  className="thumbnail"
                />
              </Col>
              <Col>
                <Row>{dataTrack.title}</Row>
                <Row>{dataTrack.album}</Row>
              </Col>
            </Row>
          </Col>
          <Col lg={2}>
            <Row>
              <Col>
                <button onClick={goPreviousTrack}>
                  <img src="" alt="previous track btn" className="" />
                </button>
              </Col>
              <Col>
                {/* <button onClick={play}>play</button> */}
                {isPlayPause ? (
                  <button onClick={playPause}>
                    <img src="" alt="play btn" className="" />
                  </button>
                ) : (
                  <div onClick={playPause}>
                    <img src="" alt="pause btn" className="" />
                  </div>
                )}
              </Col>
              <Col>
                <button onClick={goNextTrack}>
                  <img src="" alt="next track btn" className="" />
                </button>
              </Col>
            </Row>
          </Col>
          <Col lg={5}>
            <WaveSound trackUrl={dataTrack.urlTrack} />
          </Col>
          <Col lg={3}>
            <Row>
              <Col>
                {/* <img src="" alt="speaker on icon" className="" /> */}
                {!isMute ? (
                  <div onClick={isItMute} className="">
                    <img src="" alt="speaker on icon" className="" />
                  </div>
                ) : (
                  <div onClick={isItMute} className="">
                    <img src="" alt="speaker off icon" className="" />
                  </div>
                )}
              </Col>
              <Col>
                <input type="range" />
              </Col>
              <Col>
                {!isChromeCast ? (
                  <div onClick={isChromeCastOn} className="">
                    <img src="" alt="chromecast off icon" className="" />
                  </div>
                ) : (
                  <div onClick={isChromeCastOn}>
                    <img src="" alt="chromecast on icon" className="" />
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PlayBar;
