import React, { useRef, useEffect, useState } from "react";
//import WaveSurfer from "wavesurfer.js";
import { useDispatch, useSelector } from "react-redux";
import { isPlay, isPlayBarDisplayed } from "../../redux/trackData/actions";
import { setWaveSurfer } from "../../redux/trackData/actions";
import WaveSurfer from "wavesurfer.js";
import AudioSpectrum from "react-audio-spectrum";
// import sound from "./sound2.wav";
function WaveSound({ trackUrl }) {
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
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 2,
      height: 100,
      barGap: 2,
      maxCanvasWidth: 100,
      autoCenter: true,
      responsive: true,
    });
    dispatch(setWaveSurfer(wavesurfer));
    wavesurfer.load(trackUrl);
  }, []);

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
      <audio
        id="audio-element"
        src={trackUrl}
        crossorigin="anonymous"
        autoPlay
      />
      <AudioSpectrum
        id={"audio-canvas"}
        height={200}
        width={300}
        audioId={"audio-element"}
        capColor={"red"}
        capHeight={2}
        meterWidth={20}
        meterCount={512}
        meterColor={[
          { stop: 0, color: "#f00" },
          { stop: 0.5, color: "#0CD7FD" },
          { stop: 1, color: "red" },
        ]}
        gap={4}
      />
      <div className="wave" ref={waveformRef}></div>
    </>
  );
}

export default WaveSound;
