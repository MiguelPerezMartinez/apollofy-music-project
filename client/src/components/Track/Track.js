import React, { useEffect } from "react";
//import TrackReducer
import { useDispatch, useSelector } from "react-redux";
import { trackObjectAction } from "../../redux/trackData/actions";

function Track() {
  const track = useSelector((state) => state.trackReducer);
  const dispatch = useDispatch();

  const { trackObject } = track;
  const trackProperties = {
    title: "La conga",
    author: "Congito",
    album: "Los congitos",
    releaseYear: "2002",
    genre: "Samba",
    urlImage: "eeeeeee",
    urlTrack: "res",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "time",
  };

  useEffect(() => {
    dispatch(trackObjectAction(trackProperties));
  }, []);

  return (
    <div className="general-container">
      <p>Track</p>
      <p>duration</p>
      <p>Genre</p>
    </div>
  );
}

export default Track;
