import React from "react";

import "./styles.css";

export default function TrackImg({ urlImage }) {
  return (
    <>
      <div className="track-image-component-container">
        <div
          className="track-image-component-image"
          style={{ backgroundImage: `url(${urlImage})` }}
        ></div>
        <div className="track-play-hover" />
      </div>
    </>
  );
}
