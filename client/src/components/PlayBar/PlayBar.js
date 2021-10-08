import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  isPlay,
  isPlayBarDisplayed,
  setWaveSurfer,
  trackObjectAction,
  setemptyHistoryQueue,
  setPositionInHistory,
} from "../../redux/trackData/actions";
import {
  setTrackHistoryInLocalStorage,
  resetPositionInHistory,
} from "../../services/localStorage";

import WaveSurfer from "wavesurfer.js";
// import WaveSound from "../WaveSound";

import "./styles.css";

//Components and MUI icons
import { Row, Col } from "react-bootstrap";
import TrackImg from "../TrackImg";
import FavButton from "../FavButton";
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
  const trackReducer = useSelector((state) => state.trackReducer);
  const { isPlaying, waveSurfer, trackObject, positionInHistory } =
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
      dispatch(isPlay(false));
    } else {
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

    if (positionInHistory > 0) {
      dispatch(setPositionInHistory(positionInHistory - 1));
    }

    console.log("position ", positionInHistory);

    const prevSong = JSON.parse(localStorage.getItem("trackHistory"))[
      positionInHistory
    ];

    localStorage.setItem("trackHistory", JSON.stringify(historySongs));

    dispatch(trackObjectAction(prevSong));
  }

  function skipForward() {
    const trackQueue = JSON.parse(localStorage.getItem("trackQueue"));

    if (trackQueue === null || trackQueue.length < 1) {
      console.log("Play recomended ", trackQueue);
    } else {
      const nextSong = trackQueue.shift();
      localStorage.setItem("trackQueue", JSON.stringify(trackQueue));
      dispatch(trackObjectAction(nextSong));
    }
    const resetedHistoryPosition = resetPositionInHistory();
    dispatch(setPositionInHistory(resetedHistoryPosition));
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
  function setHistoryQueueLocalStorage(track) {
    let existingHistoryQueue = JSON.parse(localStorage.getItem("trackHistory"));

    if (existingHistoryQueue === null) {
      existingHistoryQueue = [];
    }

    existingHistoryQueue.push(track);

    localStorage.setItem("trackHistory", JSON.stringify(existingHistoryQueue));
  }
  // setHistoryQueueLocalStorage(trackObject);

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
      hideScrollbar: true,
      // fillParent: true
      partialRender: true,
      fillParent: true,
      autoCenter: true,
      responsive: true,
    });
    dispatch(setWaveSurfer(wavesurfer));

    wavesurfer.load(trackObject.urlTrack);

    wavesurfer.on("ready", () => {
      let finalsecond = Math.floor(wavesurfer.getDuration() % 60);
      let finalminute = Math.floor((wavesurfer.getDuration() / 60) % 60);
      if (finalsecond < 10) {
        finalsecond = "0" + finalminute;
      }

      setTrackDurationTime(finalminute + ":" + finalsecond);
      wavesurfer.play();
      setTrackHistoryInLocalStorage(trackObject);
      dispatch(isPlay(true));
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
      skipForward();
    });
  }, [trackObject]);

  return (
    <>
      <div className="animated">
        <span>A really long text to scroll through</span>
      </div>
      <Row>
        <Col>
          <Row className="main-playbar-container">
            <Col lg={3} md={6} xs={5} className="playbar-track-info-container">
              <Row className="playbar-info">
                <Col lg={3} md={3} xs={6}>
                  <div className="playbar-image">
                    <TrackImg urlCover={trackObject.urlCover} />
                  </div>
                </Col>
                <Col lg={9} md={9} xs={6}>
                  <Row className="playbar-title">
                    <span>{trackObject.title}</span>
                  </Row>
                  <Row className="playbar-author">
                    <span>{trackObject.author}</span>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} xs={5}>
              <Row className="playbar-buttons-container">
                <Col lg={1} md={4} xs={4} className="skip-backward">
                  <div onClick={skipBackward}>
                    <SkipPreviousOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1} className="d-none d-lg-block">
                  <div onClick={rewindBackward}>
                    <FastRewindOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1} md={4} xs={4}>
                  {isPlaying ? (
                    <div onClick={playPause}>
                      <PauseOutlined fontSize="large" />
                    </div>
                  ) : (
                    <div onClick={playPause}>
                      <PlayArrowOutlined fontSize="large" />
                    </div>
                  )}
                </Col>
                <Col lg={1} className="d-none d-lg-block">
                  <div onClick={fastForward}>
                    <FastForwardOutlined fontSize="large" />
                  </div>
                </Col>
                <Col lg={1} md={4} xs={4}>
                  <div onClick={skipForward}>
                    <SkipNextOutlined fontSize="large" />
                  </div>
                </Col>
              </Row>
              <Row className="playbar-wave-container d-none d-lg-block">
                <Col>
                  <div className="playbar-wave" ref={waveformRef} />
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="d-none d-lg-block">
              <Row className="playbar-timer">
                {trackProgressTime} / {trackDurationTime}
              </Row>
            </Col>
            <Col lg={2} className="d-none d-lg-block">
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
            <Col md={2}>
              <Row>
                <Col md={1} className="d-none d-md-block playbar-fav-button">
                  <FavButton />
                </Col>
                <Col md={2} className="d-none d-md-block playbar-fav-button">
                  {/* TEMPORAL BUTTONS */}
                  <Link to="/queue-tracks">
                    <div>show queue</div>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="playbar-cast-container d-none d-lg-block d-md-block">
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
