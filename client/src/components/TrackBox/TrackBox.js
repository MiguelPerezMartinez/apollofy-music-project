import React from "react";
import "./styles.css";

function TrackBox({ trackNum, size = "small" }) {
  const boxSize = "track-box-" + size;
  return <div className={boxSize}>TRACK {trackNum}</div>;
}

export default TrackBox;
