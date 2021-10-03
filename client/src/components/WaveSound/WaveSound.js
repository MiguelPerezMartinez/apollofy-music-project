import React, { useRef, useEffect, useState } from "react";
//import WaveSurfer from "wavesurfer.js";
import { useDispatch, useSelector } from "react-redux";
import { isPlay, isPlayBarDisplayed } from "../../redux/trackData/actions";
import { setWaveSurfer } from "../../redux/trackData/actions";
import WaveSurfer from "wavesurfer.js";
// import sound from "./sound2.wav";
function WaveSound({ trackUrl }) {
  const trackReducer = useSelector((state) => state.trackReducer);
  const { waveSurfer } = trackReducer;
  const dispatch = useDispatch();
  const waveformRef = useRef();
  // const waveformRef = useRef();
  // const [waveForm, steWaveForm] = useState();
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
    dispatch(setWaveSurfer(wavesurfer.current));
    wavesurfer.load(trackUrl);

    // // current time capture event
    wavesurfer.on("audioprocess", function (e) {
      console.log("current time => ", wavesurfer.getCurrentTime());
    });
  }, []);

  // current time capture event
  waveSurfer.on("audioprocess", function (e) {
    console.log("current time => ", waveSurfer.getCurrentTime());
  });
  // function play() {
  //   waveSurfer.playPause();
  //   if (isPlaying) {
  //     dispatch(isPlay(false));
  //   } else {
  //     dispatch(isPlay(true));
  //   }
  // }

  function close() {
    dispatch(isPlayBarDisplayed(false));
  }
  return (
    <>
      <div className="wave" ref={waveformRef}></div>
    </>
  );
}

export default WaveSound;
