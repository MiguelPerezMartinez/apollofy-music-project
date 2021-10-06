import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlay } from "../../redux/trackData/actions";
import {
  setWaveSurfer,
  trackObjectAction,
  setemptyHistoryQueue,
} from "../../redux/trackData/actions";
import WaveSurfer from "wavesurfer.js";
// import WaveSound from "../WaveSound";
import "./styles.css";

//Components and MUI icons
import { Row, Col } from "react-bootstrap";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import PauseOutlined from "@material-ui/icons/PauseOutlined";
import SkipPreviousOutlined from "@material-ui/icons/SkipPreviousOutlined";
import SkipNextOutlined from "@material-ui/icons/SkipNextOutlined";
import FastForwardOutlined from "@material-ui/icons/FastForwardOutlined";
import FastRewindOutlined from "@material-ui/icons/FastRewindOutlined";
import VolumeUpOutlined from "@material-ui/icons/VolumeUpOutlined";
import VolumeOffOutlined from "@material-ui/icons/VolumeOffOutlined";
import CastOutlined from "@material-ui/icons/CastOutlined";
import CastConnected from "@material-ui/icons/CastConnected";

function PlayBar() {
  //Redux and ref vars
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlaying, waveSurfer, trackObject, emptyHistoryQueue } =
    trackReducer;
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

  function rewindBackward() {
    waveSurfer.skipBackward(5);
  }

  function fastForward() {
    waveSurfer.skipForward(5);
  }
  function skipBackward() {
    const historySongs = JSON.parse(localStorage.getItem("trackHistory"));
    let prevSongPos = 0;
    if (historySongs.length === 1) {
      prevSongPos = historySongs.length - 1;
      dispatch(setemptyHistoryQueue(false));
    } else if (historySongs.length >= 2) {
      prevSongPos = historySongs.length - 2;
    }

    const prevSong = JSON.parse(localStorage.getItem("trackHistory"))[
      prevSongPos
    ];
    historySongs.pop();

    localStorage.setItem("trackHistory", JSON.stringify(historySongs));

    dispatch(trackObjectAction(prevSong));
  }
  function skipForward() {}

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
    if (waveSurfer != null) {
      waveSurfer.destroy();
    }
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

      fillParent: true,
      maxCanvasWidth: 20,
      // autoCenter: true,
      responsive: true,
    });
    dispatch(setWaveSurfer(wavesurfer));

    wavesurfer.load(trackObject.urlTrack);

    wavesurfer.on("ready", (e) => {
      let finalsecond = Math.floor(wavesurfer.getDuration() % 60);
      let finalminute = Math.floor((wavesurfer.getDuration() / 60) % 60);
      if (finalsecond < 10) {
        finalsecond = "0" + finalminute;
      }

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
  }, [trackObject]);

  return (
    <>
      <Row className="main-playbar-container">
        <Col className="image-title-box" lg={3}>
          <Row>
            <Col lg={6} className="thumbnail-container">
              <img
                src={trackObject.urlImage}
                alt="thumbnail"
                className="thumbnail"
              />
            </Col>
            <Col lg={6} className="title-album-container">
              <Row className="title">{trackObject.title}</Row>
              <Row className="album">{trackObject.album}</Row>
            </Col>
          </Row>
        </Col>
        <Col className="comands-and-wave" lg={7}>
          <Row className="wave-box">
            {/* <WaveSound trackUrl={dataTrack.urlTrack} /> */}
            <div className="wave" ref={waveformRef}></div>
          </Row>
          <Row className="buttons-box">
            <Col lg={1}>
              {emptyHistoryQueue ? (
                <div onClick={skipBackward}>
                  <SkipPreviousOutlined fontSize="large" />
                </div>
              ) : (
                <div>
                  <SkipPreviousOutlined fontSize="medium" />
                </div>
              )}
            </Col>
            <Col lg={1}>
              <div onClick={rewindBackward}>
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
              <div onClick={fastForward}>
                <FastForwardOutlined fontSize="large" />
              </div>
            </Col>
            <Col lg={1}>
              <div onClick={skipForward}>
                <SkipNextOutlined fontSize="large" />
              </div>
            </Col>
            <Col lg={2}>
              {/* <span className="time"> */}
              {trackProgressTime} / {trackDurationTime}
              {/* </span> */}
            </Col>
          </Row>
        </Col>
        <Col className="volume-chromecast">
          <Row>
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
            <Col lg={2}>
              {!isChromeCast ? (
                <div onClick={isChromeCastOn}>
                  <CastOutlined fontSize="medium" />
                </div>
              ) : (
                <div onClick={isChromeCastOn}>
                  <CastConnected fontSize="medium" />
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
