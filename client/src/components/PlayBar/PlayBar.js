import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlay } from "../../redux/trackData/actions";
import { setWaveSurfer } from "../../redux/trackData/actions";
import WaveSurfer from "wavesurfer.js";
// import WaveSound from "../WaveSound";
import "./styles.css";

//Components and MUI icons
import { Row, Col } from "react-bootstrap";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import PauseOutlined from "@material-ui/icons/PauseOutlined";
import SkipPreviousOutlined from "@material-ui/icons/SkipPreviousOutlined";
import SkipNextOutlined from "@material-ui/icons/SkipNextOutlined";
// import FastForwardOutlined from "@material-ui/icons/FastForwardOutlined";
// import FastRewindOutlined from "@material-ui/icons/SkipPreviousOutlined";
import VolumeUpOutlined from "@material-ui/icons/VolumeUpOutlined";
import VolumeOffOutlined from "@material-ui/icons/VolumeOffOutlined";
import CastOutlined from "@material-ui/icons/CastOutlined";
import CastConnected from "@material-ui/icons/CastConnected";

function PlayBar({ dataTrack }) {
  //Redux and ref vars
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlaying, waveSurfer } = trackReducer;
  const dispatch = useDispatch();
  const waveformRef = useRef();

  //State vars
  const [isMute, setMute] = useState(false);
  const [isPlayPause, setPlayPause] = useState(true);
  const [isChromeCast, setChromecast] = useState(false);
  const [trackProgressTime, setTrackProgressTime] = useState(0);
  const [trackDurationTime, setTrackDurationTime] = useState(0);
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
      maxCanvasWidth: 10,
      autoCenter: true,
      responsive: true,
    });
    dispatch(setWaveSurfer(wavesurfer));
    wavesurfer.load(dataTrack.urlTrack);

    //events
    //set track progress time
    wavesurfer.on("audioprocess", function (e) {
      setTrackProgressTime(wavesurfer.getCurrentTime());
    });
    //reset play button
    wavesurfer.on("finish", function (e) {
      setPlayPause(true);
    });
  }, []);

  return (
    <>
      <Row className="main-playbar-container">
        <Col lg={2}>
          <Row>
            <Col lg={4} className="thumbnail-container">
              <img
                src={dataTrack.urlImage}
                alt="thumbnail"
                className="thumbnail"
              />
            </Col>
            <Col className="title-album-container">
              <Row className="title">{dataTrack.title}</Row>
              <Row className="album">{dataTrack.album}</Row>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <Row>
            <Col>
              <div onClick={skipBackward}>
                <SkipPreviousOutlined fontSize="large" />
              </div>
            </Col>
            <Col>
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
            <Col>
              <div onClick={skipForward}>
                <SkipNextOutlined fontSize="large" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={5}>
          {/* <WaveSound trackUrl={dataTrack.urlTrack} /> */}
          <div className="wave" ref={waveformRef}></div>
          <span>
            {trackProgressTime} / {trackDurationTime}
          </span>
        </Col>
        <Col lg={3}>
          <Row>
            <Col>
              {!isMute ? (
                <div onClick={isItMute} className="">
                  <VolumeUpOutlined />
                </div>
              ) : (
                <div onClick={isItMute} className="">
                  <VolumeOffOutlined />
                </div>
              )}
            </Col>
            <Col>
              <input type="range" onChange={handleVolume} />
            </Col>
            <Col>
              {!isChromeCast ? (
                <div onClick={isChromeCastOn} className="">
                  <CastOutlined />
                </div>
              ) : (
                <div onClick={isChromeCastOn}>
                  <CastConnected />
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PlayBar;
