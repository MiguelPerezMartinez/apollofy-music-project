import React, { useEffect } from "react";
import "./styles.css";
//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";
import { isPlayBarDisplayed, isPlaying } from "../../redux/trackData/actions";
import FavButton from "../FavButton";
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
      <div className="rowGrid">
        <img
          className="image-track-long"
          src={dataTrack.urlImage}
          alt="songpicture"
        ></img>
        <div className="text-long-box">
          {/* <p className="titleText-long-track">Song:</p> */}
          <p className="text-long-track">{dataTrack.title}</p>
        </div>
        <div className="text-long-box">
          {/* <p className="titleText-long-track">Album:</p> */}
          <p className="text-long-track">{dataTrack.album}</p>
        </div>
        <div className="text-long-box">
          {/* <p className="titleText-long-track">Author:</p> */}
          <p className="text-long-track">{dataTrack.author}</p>
        </div>
        <div className="text-long-box">
          {/* <p className="titleText-long-track">Duration:</p> */}
          <p className="text-long-track">{dataTrack.duration}</p>
        </div>
      </div>
    </div>
  );
}

export default Track;
