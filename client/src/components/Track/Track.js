import React, { useEffect } from "react";
//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";

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
      <img src={dataTrack.urlImage} alt="songpicture"></img>
      <p>{dataTrack.title}</p>
      <p>{dataTrack.album}</p>
      <p>{dataTrack.author}</p>
      <p>{dataTrack.duration}</p>
    </div>
  );
}

export default Track;
