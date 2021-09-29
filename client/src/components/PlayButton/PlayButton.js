import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlaying, isPlayBarDisplayed } from "../../redux/trackData/actions";
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
  function close() {
    dispatch(isPlayBarDisplayed(false));
  }
  return (
    <div>
      <button onClick={play}>Play</button>;<button onClick={close}>X</button>;
    </div>
  );
}

export default PlayButton;
