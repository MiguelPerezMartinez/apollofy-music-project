import React, { useEffect } from "react";
//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";
import PlayButton from "../../components/PlayButton";

function Track({ dataTrack }) {
  const track = useSelector((state) => state.trackReducer);
  const { trackObject } = track;

  const dispatch = useDispatch();

  function setReduxTrackData() {
    console.log(dataTrack);
    dispatch(trackObjectAction(dataTrack));
  }
  useEffect(() => {
    dispatch(isPlayBarDisplayed(true));
    dispatch(isPlaying(true));
  }, [trackObject]);
  return (
    <div className="general-container" onClick={setReduxTrackData}>
      <PlayButton />
      <p>Track</p>
      <p>duration</p>
      <p>Genre</p>
    </div>
  );
}

export default Track;
