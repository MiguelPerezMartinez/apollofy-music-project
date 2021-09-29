import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlaying } from "../../redux/trackData/actions";
function PlayButton() {
  const isPlayed = useSelector((state) => state.trackReducer.isPlaying);
  const dispatch = useDispatch();

  function play() {
    if (isPlayed) {
      dispatch(isPlaying(false));
    } else {
      dispatch(isPlaying(true));
    }
  }
  return <button onClick={play}>Play</button>;
}

export default PlayButton;
