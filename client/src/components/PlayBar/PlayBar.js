import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlay, isPlayBarDisplayed } from "../../redux/trackData/actions";
import { setWaveSurfer } from "../../redux/trackData/actions";
import WaveSurfer from "wavesurfer.js";
// import WaveSound from "../WaveSound";
import "./styles.css";

//Components and MUI icons
import { Row, Col } from "react-bootstrap";
import TrackImg from "../TrackImg";
import {
  CastOutlined,
  CastConnected,
  PlayArrowOutlined,
  PauseOutlined,
  SkipPreviousOutlined,
  SkipNextOutlined,
  FastForwardOutlined,
  FastRewindOutlined,
  VolumeUpOutlined,
  VolumeOffOutlined,
} from "@material-ui/icons";

function PlayBar() {
  //Redux and ref vars
  const { isPlaying, waveSurfer, trackObject } = useSelector(
    (state) => state.trackReducer,
  );

  const dispatch = useDispatch();
  const waveformRef = useRef();

  //State vars
  const [isMute, setMute] = useState(false);
  const [isPlayPause, setPlayPause] = useState(true);
  const [isChromeCast, setChromecast] = useState(false);
  const [trackProgressTime, setTrackProgressTime] = useState(0);
  const [trackDurationTime, setTrackDurationTime] = useState(0);

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

  function skipBackward() {
    waveSurfer.skipBackward(5);
  }

  function skipForward() {
    waveSurfer.skipForward(5);
  }

  function isItMute() {
    if (isMute) {
      setMute(false);
      waveSurfer.setMute(false);
    } else {
      setMute(true);
      waveSurfer.setMute(true);
    }
  }

  function handleVolume(e) {
    waveSurfer.setVolume(e.target.value / 100);
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

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      cursorColor: "#4353FF",
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 0,
      height: 48,
      barGap: 2,
      hideScrollbar: true,
      // fillParent: true

      maxCanvasWidth: 20,
      // autoCenter: true,
      responsive: true,
    });
    dispatch(setWaveSurfer(wavesurfer));
    wavesurfer.load(trackObject.urlTrack);

    //events
    //set track duration time
    wavesurfer.on("ready", (e) => {
      let finalsecond = Math.floor(wavesurfer.getDuration() % 60);
      let finalminute = Math.floor((wavesurfer.getDuration() / 60) % 60);
      if (finalsecond < 10) {
        finalsecond = "0" + finalminute;
      }
      console.log(wavesurfer.getDuration());
      setTrackDurationTime(finalminute + ":" + finalsecond);
    });
    //set track progress time
    wavesurfer.on("audioprocess", function (e) {
      let second = Math.floor(wavesurfer.getCurrentTime() % 60);
      let minute = Math.floor((wavesurfer.getCurrentTime() / 60) % 60);

      if (second < 10) {
        second = "0" + second;
      }

      setTrackProgressTime(minute + ":" + second);
    });
    //reset play button
    wavesurfer.on("finish", function (e) {
      setPlayPause(true);
    });
  }, []);
  return (
    <>
      <Row>
        <Col>
          <Row className="main-playbar-container">
            <Col lg={3} className="playbar-track-info-container">
              <Row className="playbar-info">
                <Col lg={3}>
                  <div className="playbar-image">
                    <TrackImg urlImage={trackObject.urlImage} />
                  </div>
                </Col>
                <Col lg={9}>
                  <Row className="playbar-title">{trackObject.title}</Row>
                  <Row className="playbar-author">{trackObject.author}</Row>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row className="playbar-buttons-container">
                <Col lg={1}>
                  <div onClick={skipBackward}>
                    <SkipPreviousOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1}>
                  <div onClick={skipBackward}>
                    <FastRewindOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1}>
                  {isPlayPause ? (
                    <div onClick={playPause}>
                      <PlayArrowOutlined fontSize="large" />
                    </div>
                  ) : (
                    <div onClick={playPause}>
                      <PauseOutlined fontSize="large" />
                    </div>
                  )}
                </Col>
                <Col lg={1}>
                  <div onClick={skipForward}>
                    <FastForwardOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1}>
                  <div onClick={skipForward}>
                    <SkipNextOutlined fontSize="large" />
                  </div>
                </Col>
              </Row>
              <Row className="playbar-wave-container">
                <Col lg={11}>
                  <div className="playbar-wave" ref={waveformRef} />
                </Col>
              </Row>
            </Col>
            <Col lg={1}>
              <Row className="playbar-timer">
                {trackProgressTime} / {trackDurationTime}
              </Row>
            </Col>
            <Col lg={2}>
              <Row className="playbar-volume-container">
                <Col lg={2}>
                  {!isMute ? (
                    <div onClick={isItMute}>
                      <VolumeUpOutlined fontSize="medium" />
                    </div>
                  ) : (
                    <div onClick={isItMute}>
                      <VolumeOffOutlined fontSize="medium" />
                    </div>
                  )}
                </Col>
                <Col lg={6}>
                  <input type="range" onChange={handleVolume} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="playbar-cast-container">
            {!isChromeCast ? (
              <div onClick={isChromeCastOn} className="cast-block">
                <CastOutlined fontSize="medium" />
              </div>
            ) : (
              <div onClick={isChromeCastOn} className="cast-block">
                <CastConnected fontSize="medium" />
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PlayBar;
