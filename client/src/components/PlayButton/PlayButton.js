import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useDispatch, useSelector } from "react-redux";
import { isPlaying, isPlayBarDisplayed } from "../../redux/trackData/actions";

function PlayButton() {
  const isPlayed = useSelector((state) => state.trackReducer.isPlaying);
  const dispatch = useDispatch();
  const waveformRef = useRef();

  useEffect(() => {
    WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      cursorColor: "#4353FF",
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 200,
      barGap: 3,
    });
  }, []);
  function play() {
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
        <div ref={waveformRef}></div>
      </div>
      <button onClick={play}>Play</button>;<button onClick={close}>X</button>;
    </>
  );
}

export default PlayButton;
