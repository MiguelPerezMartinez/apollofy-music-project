import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useDispatch, useSelector } from "react-redux";
import { isPlaying, isPlayBarDisplayed } from "../../redux/trackData/actions";
// import sound from "./sound2.wav";
function PlayButton({ trackUrl }) {
  const isPlayed = useSelector((state) => state.trackReducer.isPlaying);
  const dispatch = useDispatch();
  const waveformRef = useRef();
  const [waveForm, steWaveForm] = useState();
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      cursorColor: "#4353FF",
      barWidth: 3,
      barRadius: 5,
      cursorWidth: 2,
      height: 100,
      barGap: 5,
      maxCanvasWidth: 8,
      autoCenter: true,
      responsive: true,
    });
    wavesurfer.load(trackUrl);
    steWaveForm(wavesurfer);
  }, []);

  function play() {
    waveForm.playPause();
    if (isPlayed) {
      dispatch(isPlaying(false));
    } else {
      dispatch(isPlaying(true));
    }
  }

  function close() {
    dispatch(isPlayBarDisplayed(false));
  }
  return (
    <>
      <div className="repreoductorBox">
        <div className="wave" ref={waveformRef}></div>
      </div>
      <button onClick={play}>Play</button>;<button onClick={close}>X</button>;
    </>
  );
}

export default PlayButton;
