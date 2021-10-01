import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlay } from "../../redux/trackData/actions";
import WaveSound from "../WaveSound";
import "./styles.css";

//Components
import { Row, Col } from "react-bootstrap";

function PlayBar({ dataTrack }) {
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlaying, waveSurfer } = trackReducer;
  const dispatch = useDispatch();
  const [isMute, setMute] = useState(false);
  const [isChromeCast, setChromecast] = useState(false);
  console.log(dataTrack);
  function isItPlaying() {
    if (isPlaying) {
      dispatch(isPlay(false));
    } else {
      dispatch(isPlay(true));
    }
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
      setChromecast(false);
    } else {
      setChromecast(true);
    }
  }

  function play() {
    waveSurfer.playPause();
    if (isPlaying) {
      dispatch(isPlay(false));
    } else {
      dispatch(isPlay(true));
    }
  }

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
                <div>
                  <img src="" alt="previous track btn" className="" />
                </div>
              </Col>
              <Col>
                <button onClick={play}>play</button>
                {/* {isPlay ? (
                  <button onClick={play}>
                    <img src="" alt="play btn" className="" />
                  </button>
                ) : (
                  <div onClick={play}>
                    <img src="" alt="pause btn" className="" />
                  </div>
                )} */}
              </Col>
              <Col>
                <div>
                  <img src="" alt="next track btn" className="" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={5}>
            <WaveSound trackUrl={dataTrack.urlTrack} />
          </Col>
          <Col lg={3}>
            <Row>
              <Col>
                <img src="" alt="speaker on icon" className="" />
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
